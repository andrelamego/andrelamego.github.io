import { memo, useMemo } from 'react';

/**
 * Performant starfield background using pure CSS with orbital rotation.
 * Replicates the Three.js "rotating universe" look using CSS transforms.
 *
 * - 3 layers rotate at different speeds for parallax depth
 * - All animations run on the compositor thread (transform-only)
 * - Zero WebGL / requestAnimationFrame overhead
 */

function generateStarLayers(): { small: string; medium: string; large: string } {
  const rng = (max: number) => Math.floor(Math.random() * max);

  // Stars spread in a large area centered around 0,0 — rotation pivot
  const makeShadows = (count: number, spread: number) => {
    const half = spread / 2;
    const shadows: string[] = [];
    for (let i = 0; i < count; i++) {
      shadows.push(`${rng(spread) - half}px ${rng(spread) - half}px #fff`);
    }
    return shadows.join(', ');
  };

  return {
    small: makeShadows(700, 3000),
    medium: makeShadows(250, 3000),
    large: makeShadows(100, 3000),
  };
}

export const UniverseBackground = memo(function UniverseBackground() {
  const stars = useMemo(() => generateStarLayers(), []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505] pointer-events-none overflow-hidden">
      {/* Layer 1 — distant stars, slow rotation */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full bg-transparent animate-[starOrbit_200s_linear_infinite]"
        style={{
          width: '1px',
          height: '1px',
          boxShadow: stars.small,
        }}
      />
      {/* Layer 2 — mid-distance stars, medium rotation */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full bg-transparent animate-[starOrbit_140s_linear_infinite_reverse]"
        style={{
          width: '2px',
          height: '2px',
          boxShadow: stars.medium,
        }}
      />
      {/* Layer 3 — close stars, faster rotation */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full bg-transparent animate-[starOrbit_90s_linear_infinite]"
        style={{
          width: '3px',
          height: '3px',
          boxShadow: stars.large,
        }}
      />
    </div>
  );
});
