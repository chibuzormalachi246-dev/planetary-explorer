import * as THREE from 'three';
import { PALETTE } from './config';

type Disposable = { dispose(): void };

interface Orbit {
  pivot: THREE.Group;
  spinner: THREE.Group;
  tiltX: number;
  tiltY: number;
  speed: number;
}

export interface CoreNexus {
  readonly group: THREE.Group;
  /** `arrival` eases from 0 → 1 as the camera reaches the end of the path. */
  update(elapsed: number, delta: number, arrival: number, motion: number): void;
  dispose(): void;
}

const ORBITS = [
  { radius: 8, tiltX: 1.15, tiltY: 0.35, speed: 0.4, color: PALETTE.cyan },
  { radius: 9.8, tiltX: -0.75, tiltY: 0.95, speed: -0.28, color: PALETTE.purple },
  { radius: 11.6, tiltX: 0.45, tiltY: -1.25, speed: 0.2, color: PALETTE.sky },
] as const;

/**
 * The destination at the end of the spline: an energy heart wrapped in wireframe lattices,
 * glowing halos and tilted orbital rings that fall into concentric alignment on arrival.
 * The group's local +Z axis is expected to face the arriving camera.
 */
export function createCoreNexus(glow: THREE.Texture): CoreNexus {
  const group = new THREE.Group();
  const disposables: Disposable[] = [];
  const keep = <T extends Disposable>(resource: T): T => {
    disposables.push(resource);
    return resource;
  };

  const heart = new THREE.Mesh(
    keep(new THREE.IcosahedronGeometry(1.5, 4)),
    keep(new THREE.MeshBasicMaterial({ color: PALETTE.core })),
  );

  const lattice = new THREE.Mesh(
    keep(new THREE.IcosahedronGeometry(3.2, 1)),
    keep(new THREE.MeshBasicMaterial({ color: PALETTE.cyan, wireframe: true, transparent: true, opacity: 0.5 })),
  );

  const cage = new THREE.Mesh(
    keep(new THREE.IcosahedronGeometry(5.4, 0)),
    keep(new THREE.MeshBasicMaterial({ color: PALETTE.purple, wireframe: true, transparent: true, opacity: 0.32 })),
  );

  const haloMaterial = keep(
    new THREE.SpriteMaterial({
      map: glow,
      color: PALETTE.cyan,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  const halo = new THREE.Sprite(haloMaterial);
  halo.renderOrder = 2;

  const aura = new THREE.Sprite(
    keep(
      new THREE.SpriteMaterial({
        map: glow,
        color: PALETTE.violet,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );
  aura.scale.setScalar(30);
  aura.renderOrder = 1;

  group.add(heart, lattice, cage, aura, halo);

  const satelliteGeometry = keep(new THREE.SphereGeometry(0.22, 12, 12));
  const orbits: Orbit[] = ORBITS.map((definition) => {
    const pivot = new THREE.Group();
    const spinner = new THREE.Group();

    const ring = new THREE.Mesh(
      keep(new THREE.TorusGeometry(definition.radius, 0.03, 6, 160)),
      keep(new THREE.MeshBasicMaterial({ color: definition.color, transparent: true, opacity: 0.55 })),
    );

    const satelliteMaterial = keep(new THREE.MeshBasicMaterial({ color: definition.color }));
    const leading = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    leading.position.set(definition.radius, 0, 0);
    const trailing = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    trailing.position.set(-definition.radius, 0, 0);
    trailing.scale.setScalar(0.6);

    spinner.add(ring, leading, trailing);
    pivot.add(spinner);
    pivot.rotation.set(definition.tiltX, definition.tiltY, 0);
    group.add(pivot);

    return { pivot, spinner, tiltX: definition.tiltX, tiltY: definition.tiltY, speed: definition.speed };
  });

  return {
    group,
    update(elapsed, delta, arrival, motion) {
      const spin = delta * motion;
      lattice.rotation.x += 0.16 * spin;
      lattice.rotation.y += 0.24 * spin;
      cage.rotation.y -= 0.1 * spin;
      cage.rotation.z += 0.07 * spin;

      const pulse = Math.sin(elapsed * 2.2) * motion;
      heart.scale.setScalar((1 + arrival * 0.2) * (1 + pulse * 0.06));
      halo.scale.setScalar((12 + arrival * 8) * (1 + pulse * 0.05));
      haloMaterial.opacity = 0.55 + arrival * 0.35;

      // Rings start scattered and converge into concentric alignment facing the camera.
      const settle = 1 - arrival * 0.92;
      for (const orbit of orbits) {
        orbit.pivot.rotation.x = orbit.tiltX * settle;
        orbit.pivot.rotation.y = orbit.tiltY * settle;
        orbit.spinner.rotation.z += orbit.speed * spin * (1 + arrival);
      }
    },
    dispose() {
      disposables.forEach((resource) => resource.dispose());
      disposables.length = 0;
    },
  };
}
