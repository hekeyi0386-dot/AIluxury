"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise reveal on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line masked headline reveal. Pass lines separated explicitly. */
export function Headline({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]" aria-hidden>
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.3, delay: delay + i * 0.14, ease: EASE }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Returns a ref + a y MotionValue that drifts as the element crosses the viewport. */
export function useParallax(distance = 80): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return { ref, y, progress: scrollYProgress };
}

/** A framed image area whose content drifts and slowly scales for editorial depth. */
export function ParallaxFrame({
  children,
  className = "",
  distance = 70,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const { ref, y, progress } = useParallax(distance);
  const scale = useTransform(progress, [0, 0.5, 1], [1.18, 1.1, 1.18]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}
