import * as THREE from 'three';

/**
 * Builds a soft, white radial falloff texture on a 2D canvas.
 * `stops` are `[offset, alpha]` pairs from the centre (0) to the edge (1).
 */
export function createRadialTexture(size: number, stops: ReadonlyArray<readonly [number, number]>) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  if (context) {
    const radius = size / 2;
    const gradient = context.createRadialGradient(radius, radius, 0, radius, radius, radius);
    for (const [offset, alpha] of stops) {
      gradient.addColorStop(offset, `rgba(255, 255, 255, ${alpha})`);
    }
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }

  return new THREE.CanvasTexture(canvas);
}
