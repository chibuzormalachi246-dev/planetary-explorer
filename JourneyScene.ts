import * as THREE from 'three';
import { PALETTE, PATH_POINTS } from './config';
import { createCoreNexus, type CoreNexus } from './coreNexus';
import { clamp, damp, mulberry32, smoothstep } from './math';
import { createRadialTexture } from './textures';

/*
 * The original prototype ran on three r128, where hex colours were fed straight into the
 * shaders and written to the canvas without sRGB encoding. Reproducing that pipeline keeps
 * the palette, fog and ACES tone-mapping looking exactly like the prototype on modern three.
 */
THREE.ColorManagement.enabled = false;

/*
 * r128 used "legacy" lights: intensities were implicitly multiplied by π and point lights
 * faded linearly to their cut-off distance. Scaling by π and using decay 0 (window falloff
 * only) gives a close match; the 0.75 factor balances the window curve's brighter mid-range.
 */
const LEGACY_LIGHT_SCALE = Math.PI * 0.75;

const BASE_FOV = 65;
const MAX_PORTRAIT_FOV = 85;
const LOOK_AHEAD = 0.04;
const PARALLAX = 0.6;
const PORTAL_COUNT = 18;
const ARTIFACT_COUNT = 40;
const PARTICLE_COUNT = 2400;
const CORE_DISTANCE = 34;
const CORRIDOR_RADIUS = 4.5;
const Z_AXIS = new THREE.Vector3(0, 0, 1);

export interface FrameInput {
  /** Smoothed journey progress, 0–1. */
  progress: number;
  /** Smoothed pointer position, -1–1 on each axis. */
  pointerX: number;
  pointerY: number;
  /** Progress units per second — drives the warp FOV kick. */
  velocity: number;
  /** Seconds since the previous frame. */
  delta: number;
  /** Seconds since the scene started. */
  elapsed: number;
  /** 1 for full motion, smaller values when the user prefers reduced motion. */
  motion: number;
}

interface Artifact {
  mesh: THREE.Mesh;
  spinX: number;
  spinY: number;
}

type Disposable = { dispose(): void };

export class JourneyScene {
  readonly domElement: HTMLCanvasElement;

  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly curve: THREE.CatmullRomCurve3;
  private readonly pathEnd = new THREE.Vector3();
  private readonly pathEndTangent = new THREE.Vector3();
  private readonly pathLength: number;
  private readonly keyLight: THREE.PointLight;
  private readonly fillLight: THREE.PointLight;
  private readonly portals: THREE.Mesh[] = [];
  private readonly artifacts: Artifact[] = [];
  private readonly particles: THREE.Points;
  private readonly core: CoreNexus;
  private readonly disposables: Disposable[] = [];

  private readonly camPos = new THREE.Vector3();
  private readonly lookPos = new THREE.Vector3();
  private baseFov = BASE_FOV;
  private fovBoost = 0;

  constructor(width: number, height: number) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.domElement = this.renderer.domElement;
    this.domElement.style.display = 'block';

    this.scene.fog = new THREE.FogExp2(PALETTE.void, 0.015);

    this.camera = new THREE.PerspectiveCamera(BASE_FOV, width / height, 0.1, 1000);
    this.applyAspect(width / height);

    // Lighting — a dim ambient wash plus two coloured lights that travel with the camera.
    this.keyLight = new THREE.PointLight(PALETTE.cyan, 5 * LEGACY_LIGHT_SCALE, 50, 0);
    this.fillLight = new THREE.PointLight(PALETTE.purple, 4 * LEGACY_LIGHT_SCALE, 60, 0);
    this.scene.add(new THREE.AmbientLight(PALETTE.ambient, 1.5 * Math.PI), this.keyLight, this.fillLight);

    // The camera spline.
    this.curve = new THREE.CatmullRomCurve3(PATH_POINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    this.curve.getPointAt(1, this.pathEnd);
    this.curve.getTangentAt(1, this.pathEndTangent);
    this.pathLength = this.curve.getLength();

    const random = mulberry32(0x5eed);
    const dotTexture = this.track(
      createRadialTexture(64, [
        [0, 1],
        [0.3, 0.85],
        [0.62, 0.2],
        [1, 0],
      ]),
    );
    const glowTexture = this.track(
      createRadialTexture(128, [
        [0, 1],
        [0.16, 0.62],
        [0.42, 0.16],
        [1, 0],
      ]),
    );

    this.buildTrack();
    this.buildPortals();
    this.buildArtifacts(random);
    this.particles = this.buildParticles(random, dotTexture);

    // The destination, placed straight ahead of the camera's final heading.
    this.core = createCoreNexus(glowTexture);
    this.core.group.position.copy(this.pathEnd).addScaledVector(this.pathEndTangent, CORE_DISTANCE);
    this.core.group.quaternion.setFromUnitVectors(Z_AXIS, this.pathEndTangent.clone().negate());
    this.scene.add(this.core.group);
  }

  resize(width: number, height: number) {
    if (width <= 0 || height <= 0) return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.applyAspect(width / height);
  }

  update(frame: FrameInput) {
    const { delta, motion } = frame;
    const progress = clamp(frame.progress);

    // Ride the spline and aim slightly ahead along it.
    this.curve.getPointAt(progress, this.camPos);
    const ahead = progress + LOOK_AHEAD;
    if (ahead <= 1) {
      this.curve.getPointAt(ahead, this.lookPos);
    } else {
      // Extrapolate past the end of the path so the look-ahead distance never collapses
      // (otherwise mouse parallax would swing the camera wildly on arrival).
      this.lookPos.copy(this.pathEnd).addScaledVector(this.pathEndTangent, (ahead - 1) * this.pathLength);
    }

    // Interactive parallax offset.
    this.camPos.x += frame.pointerX * PARALLAX;
    this.camPos.y += frame.pointerY * PARALLAX;
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.lookPos);

    // Subtle warp: widen the field of view while travelling fast.
    const boostTarget = Math.min(Math.abs(frame.velocity) * 16, 8) * motion;
    this.fovBoost += (boostTarget - this.fovBoost) * damp(0.1, delta);
    const fov = this.baseFov + this.fovBoost;
    if (Math.abs(this.camera.fov - fov) > 0.001) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }

    // Lights follow the camera.
    this.keyLight.position.set(this.camPos.x - 2, this.camPos.y + 3, this.camPos.z - 4);
    this.fillLight.position.set(this.camPos.x + 3, this.camPos.y - 2, this.camPos.z - 2);

    // Ambient motion, normalised to the prototype's 60 fps per-frame speeds.
    const step = delta * 60 * motion;
    for (let i = 0; i < this.portals.length; i++) {
      this.portals[i].rotation.z += 0.005 * step * (i % 2 === 0 ? 1 : -1);
    }
    for (const artifact of this.artifacts) {
      artifact.mesh.rotation.x += artifact.spinX * step;
      artifact.mesh.rotation.y += artifact.spinY * step;
    }
    this.particles.rotation.z += 0.008 * delta * motion;

    this.core.update(frame.elapsed, delta, smoothstep(0.72, 1, progress), motion);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.core.dispose();
    this.disposables.forEach((resource) => resource.dispose());
    this.disposables.length = 0;
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.domElement.remove();
  }

  private applyAspect(aspect: number) {
    this.camera.aspect = aspect;
    // Portrait screens get a wider vertical FOV so the tunnel doesn't feel cramped.
    this.baseFov = aspect >= 1 ? BASE_FOV : Math.min(MAX_PORTRAIT_FOV, BASE_FOV + (1 - aspect) * 40);
    this.camera.fov = this.baseFov + this.fovBoost;
    this.camera.updateProjectionMatrix();
  }

  private track<T extends Disposable>(resource: T): T {
    this.disposables.push(resource);
    return resource;
  }

  /** Faint wireframe tube tracing the flight path. */
  private buildTrack() {
    const geometry = this.track(new THREE.TubeGeometry(this.curve, 200, 0.8, 8, false));
    const material = this.track(
      new THREE.MeshBasicMaterial({ color: PALETTE.track, wireframe: true, transparent: true, opacity: 0.15 }),
    );
    this.scene.add(new THREE.Mesh(geometry, material));
  }

  /** Torus waypoint portals aligned to the path, each carrying two rotating HUD brackets. */
  private buildPortals() {
    const ringGeometry = this.track(new THREE.TorusGeometry(3.5, 0.04, 16, 64));
    const bracketGeometry = this.track(new THREE.TorusGeometry(3.95, 0.018, 4, 48, Math.PI * 0.32));

    const variants = [
      {
        ring: this.track(
          new THREE.MeshStandardMaterial({
            color: PALETTE.cyan,
            emissive: PALETTE.azure,
            emissiveIntensity: 0.8,
            roughness: 0.2,
            metalness: 0.9,
          }),
        ),
        bracket: this.track(new THREE.MeshBasicMaterial({ color: PALETTE.cyan, transparent: true, opacity: 0.5 })),
      },
      {
        ring: this.track(
          new THREE.MeshStandardMaterial({
            color: PALETTE.violet,
            emissive: PALETTE.violet,
            emissiveIntensity: 0.8,
            roughness: 0.2,
            metalness: 0.9,
          }),
        ),
        bracket: this.track(new THREE.MeshBasicMaterial({ color: PALETTE.purple, transparent: true, opacity: 0.5 })),
      },
    ];

    const position = new THREE.Vector3();
    const tangent = new THREE.Vector3();

    for (let i = 1; i <= PORTAL_COUNT; i++) {
      const t = i / (PORTAL_COUNT + 1);
      this.curve.getPointAt(t, position);
      this.curve.getTangentAt(t, tangent);

      const variant = variants[i % 2 === 0 ? 0 : 1];
      const portal = new THREE.Mesh(ringGeometry, variant.ring);
      portal.position.copy(position);
      portal.quaternion.setFromUnitVectors(Z_AXIS, tangent);

      for (const angle of [0, Math.PI]) {
        const bracket = new THREE.Mesh(bracketGeometry, variant.bracket);
        bracket.rotation.z = angle + Math.PI * 0.09;
        portal.add(bracket);
      }

      this.scene.add(portal);
      this.portals.push(portal);
    }
  }

  /** Dark metallic octahedra drifting around the route, kept clear of the flight corridor. */
  private buildArtifacts(random: () => number) {
    const geometry = this.track(new THREE.OctahedronGeometry(1.2, 0));
    const solid = this.track(
      new THREE.MeshStandardMaterial({ color: PALETTE.artifact, roughness: 0.1, metalness: 0.9 }),
    );
    const wire = this.track(
      new THREE.MeshStandardMaterial({ color: PALETTE.artifact, roughness: 0.1, metalness: 0.9, wireframe: true }),
    );
    const anchor = new THREE.Vector3();

    for (let i = 0; i < ARTIFACT_COUNT; i++) {
      const mesh = new THREE.Mesh(geometry, i % 3 === 0 ? wire : solid);
      this.curve.getPointAt(random(), anchor);

      let offsetX = 0;
      let offsetY = 0;
      do {
        offsetX = (random() - 0.5) * 25;
        offsetY = (random() - 0.5) * 25;
      } while (Math.hypot(offsetX, offsetY) < CORRIDOR_RADIUS);

      mesh.position.set(anchor.x + offsetX, anchor.y + offsetY, anchor.z + (random() - 0.5) * 10);
      mesh.rotation.set(random() * Math.PI, random() * Math.PI, 0);
      mesh.scale.setScalar(0.4 + random() * 0.8);

      this.scene.add(mesh);
      this.artifacts.push({ mesh, spinX: (random() - 0.5) * 0.02, spinY: (random() - 0.5) * 0.02 });
    }
  }

  /** Cyan / violet space dust filling the whole route, including the core's surroundings. */
  private buildParticles(random: () => number, map: THREE.Texture) {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (random() - 0.5) * 80;
      positions[i3 + 1] = (random() - 0.5) * 80;
      positions[i3 + 2] = 10 - random() * 350;

      const isCyan = random() > 0.5;
      colors[i3] = isCyan ? 0 : 0.6;
      colors[i3 + 1] = isCyan ? 0.9 : 0.2;
      colors[i3 + 2] = 1;
    }

    const geometry = this.track(new THREE.BufferGeometry());
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = this.track(
      new THREE.PointsMaterial({
        size: 0.22,
        map,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );

    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
    return points;
  }
}
