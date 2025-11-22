"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { useTheme } from "next-themes";

export default function Footer() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const rotation = useMotionValue(0);
  const posX = useMotionValue(450);
  const posY = useMotionValue(60);
  const smoothX = useSpring(posX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(posY, { stiffness: 50, damping: 20 });
  const autoRef = useRef({ x: 450, y: 60, dx: 1, dy: 0.5 });

  const svgViewBox = { width: 900, height: 120 };

  useEffect(() => {
    let frame: number;
    const animateRotation = () => {
      rotation.set((rotation.get() + 2) % 360);
      frame = requestAnimationFrame(animateRotation);
    };
    frame = requestAnimationFrame(animateRotation);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      const auto = autoRef.current;
      auto.x += auto.dx * 3;
      auto.y += auto.dy * 2;
      if (auto.x > svgViewBox.width - 50 || auto.x < 50) auto.dx *= -1;
      if (auto.y > svgViewBox.height - 20 || auto.y < 20) auto.dy *= -1;
      posX.set(auto.x);
      posY.set(auto.y);
    }, 16);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const svgX = (mouseX / rect.width) * svgViewBox.width;
    const svgY = (mouseY / rect.height) * svgViewBox.height;
    posX.set(svgX);
    posY.set(svgY);
    autoRef.current = { ...autoRef.current, x: svgX, y: svgY };
  };

  const colors = {
    bg: theme === "dark" ? "#030712" : "#f9fafb",
    stroke: theme === "dark" ? "#3f3f3f" : "#d1d5db",
    gradientStart: theme === "dark" ? "#3f3f3f" : "#9ca3af",
    text: theme === "dark" ? "#4b5563" : "#6b7280",
  };

  return (
    <div
      className={`p-8 flex flex-col items-center justify-center min-h-[200px] transition-colors duration-300 ${
        theme === "dark" ? "bg-neutral-950" : "bg-neutral-50"
      }`}
    >
      <div
        ref={containerRef}
        className="w-full max-w-4xl cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          width="100%"
          height="120"
          viewBox="0 0 900 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="blur-filter"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            </filter>
            <linearGradient
              id="text-gradient"
              x1="450"
              y1="0"
              x2="450"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={colors.gradientStart} stopOpacity="0" />
              <stop
                offset="1"
                stopColor={colors.gradientStart}
                stopOpacity="0.3"
              />
            </linearGradient>
            <motion.linearGradient
              id="circle-rgb-gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
              gradientTransform={`rotate(${rotation.get()})`}
            >
              <stop offset="0" stopColor="#FF0000" />
              <stop offset="0.17" stopColor="#FFA500" />
              <stop offset="0.33" stopColor="#FFFF00" />
              <stop offset="0.5" stopColor="#00FF00" />
              <stop offset="0.67" stopColor="#0000FF" />
              <stop offset="0.83" stopColor="#8B00FF" />
              <stop offset="1" stopColor="#FF0000" />
            </motion.linearGradient>
            <mask id="stroke-mask">
              <g
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="none"
                opacity="0.7"
              >
                <text
                  x="450"
                  y="85"
                  textAnchor="middle"
                  fontSize="90"
                  fontWeight="bold"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  letterSpacing="-2"
                >
                  FASTINVO
                </text>
                <path d="M50 30 L120 30 L130 40 L60 40 Z" />
                <path d="M50 80 L50 100 L60 110 L60 90 Z" />
                <path d="M840 30 L780 30 L770 40 L830 40 Z" />
                <path d="M840 80 L840 100 L830 110 L830 90 Z" />
                <path d="M200 15 L250 15 L240 25" />
                <path d="M700 15 L650 15 L660 25" />
                <path d="M200 105 L250 105 L240 95" />
                <path d="M700 105 L650 105 L660 95" />
              </g>
            </mask>
          </defs>

          <g stroke={colors.stroke} strokeWidth="1" strokeLinejoin="round">
            <text
              x="450"
              y="85"
              textAnchor="middle"
              fontSize="90"
              fontWeight="bold"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-2"
              fill="url(#text-gradient)"
            >
              FASTINVO
            </text>
            <path
              d="M50 30 L120 30 L130 40 L60 40 Z"
              fill="url(#text-gradient)"
            />
            <path
              d="M50 80 L50 100 L60 110 L60 90 Z"
              fill="url(#text-gradient)"
            />
            <path
              d="M840 30 L780 30 L770 40 L830 40 Z"
              fill="url(#text-gradient)"
            />
            <path
              d="M840 80 L840 100 L830 110 L830 90 Z"
              fill="url(#text-gradient)"
            />
            <path d="M200 15 L250 15 L240 25" fill="none" />
            <path d="M700 15 L650 15 L660 25" fill="none" />
            <path d="M200 105 L250 105 L240 95" fill="none" />
            <path d="M700 105 L650 105 L660 95" fill="none" />
          </g>

          <g mask="url(#stroke-mask)">
            <motion.circle
              cx={smoothX}
              cy={smoothY}
              r="80"
              fill="url(#circle-rgb-gradient)"
              filter="url(#blur-filter)"
            />
          </g>
        </svg>

        <p
          className={`text-center text-sm mt-4 transition-colors duration-300 ${
            theme === "dark" ? "text-neutral-600" : "text-neutral-500"
          }`}
        >
          Lightning-fast invoicing for modern businesses
        </p>
      </div>
    </div>
  );
}
