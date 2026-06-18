import { useEffect, useRef } from "react";

const LEAF_COUNT = 22;

const leafColors = [
  "hsl(142, 55%, 32%)",
  "hsl(142, 45%, 38%)",
  "hsl(150, 50%, 35%)",
  "hsl(135, 40%, 42%)",
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface LeafConfig {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  sway: number;
  color: string;
  opacity: number;
}

function generateLeaves(): LeafConfig[] {
  return Array.from({ length: LEAF_COUNT }, (_, i) => ({
    id: i,
    left: randomBetween(0, 100),
    delay: randomBetween(0, 14),
    duration: randomBetween(8, 18),
    size: randomBetween(10, 22),
    rotation: randomBetween(0, 360),
    sway: randomBetween(20, 60),
    color: leafColors[Math.floor(Math.random() * leafColors.length)],
    opacity: randomBetween(0.06, 0.15),
  }));
}

// Small leaf SVG path
function LeafSVG({ size, color, opacity }: { size: number; color: string; opacity: number }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 30 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d="M15 0C8 6 0 12 0 22C0 32 6 40 15 42C24 40 30 32 30 22C30 12 22 6 15 0Z"
        fill={color}
      />
      <path
        d="M15 4L15 38"
        stroke={color}
        strokeWidth="0.8"
        opacity={0.4}
      />
      <path
        d="M15 10L10 8M15 16L7 12M15 22L6 18"
        stroke={color}
        strokeWidth="0.5"
        opacity={0.25}
      />
    </svg>
  );
}

export default function FallingLeaves() {
  const leaves = useRef<LeafConfig[]>(generateLeaves()).current;

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="falling-leaf"
          style={
            {
              left: `${leaf.left}%`,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
              "--sway": `${leaf.sway}px`,
              "--rotation": `${leaf.rotation}deg`,
            } as React.CSSProperties
          }
        >
          <LeafSVG size={leaf.size} color={leaf.color} opacity={leaf.opacity} />
        </div>
      ))}
    </div>
  );
}
