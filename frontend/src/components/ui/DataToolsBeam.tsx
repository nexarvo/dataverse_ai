"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DataToolsBeamProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
  curvature?: number;
  endYOffset?: number;
  className?: string;
}

export const DataToolsBeam: React.FC<DataToolsBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  endYOffset = 0,
  className = "",
}) => {
  const [path, setPath] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
      const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
      const toX = toRect.left + toRect.width / 2 - containerRect.left;
      const toY =
        toRect.top + toRect.height / 2 - containerRect.top + endYOffset;

      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2 + curvature;

      const pathData = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`;
      setPath(pathData);
      setIsVisible(true);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    return () => window.removeEventListener("resize", updatePath);
  }, [containerRef, fromRef, toRef, curvature, endYOffset]);

  if (!path) return null;

  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient
          id="datatools-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={path}
        stroke="url(#datatools-gradient)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: isVisible ? 1 : 0 }}
        transition={{
          pathLength: { duration: 2, ease: "easeInOut" },
          opacity: { duration: 0.8, delay: 0.5 },
        }}
      />
      <motion.circle
        r="2"
        fill="#3b82f6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: isVisible ? 1 : 0 }}
        transition={{
          scale: { duration: 0.4, delay: 2 },
          opacity: { duration: 0.4, delay: 2 },
        }}
      >
        <animateMotion dur="4s" repeatCount="indefinite" path={path} />
      </motion.circle>
    </svg>
  );
};
