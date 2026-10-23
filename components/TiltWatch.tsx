"use client";

import { useRef, useState, type ComponentProps } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Watch from "./Watch";

type Props = Omit<ComponentProps<typeof Watch>, "sheen" | "className"> & {
  className?: string;
  max?: number;
  float?: boolean;
};

/**
 * Simulated 3D exploration: the watch tilts toward the pointer (or finger)
 * on a perspective plane while the sapphire reflection travels across the crystal.
 */
export default function TiltWatch({ className = "", max = 16, float = false, ...watch }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 16 });
  const sy = useSpring(py, { stiffness: 90, damping: 16 });
  const rotateY = useTransform(sx, [-1, 1], [-max, max]);
  const rotateX = useTransform(sy, [-1, 1], [max * 0.7, -max * 0.7]);
  const [sheen, setSheen] = useState(0.5);

  const move = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * 2 - 1;
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    px.set(Math.max(-1, Math.min(1, x)));
    py.set(Math.max(-1, Math.min(1, y)));
    setSheen((x + 1) / 2);
  };
  const leave = () => {
    px.set(0);
    py.set(0);
    setSheen(0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`[perspective:1400px] ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={float ? { y: [0, -10, 0] } : undefined}
        transition={float ? { duration: 9, repeat: Infinity, ease: "easeInOut" } : undefined}
        className="h-full w-full"
      >
        <Watch {...watch} sheen={sheen} className="h-full w-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]" />
      </motion.div>
    </div>
  );
}
