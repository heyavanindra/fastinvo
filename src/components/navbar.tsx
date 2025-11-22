"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Button from "./ui/button";
import { useRef, useState } from "react";
import ModeToggle from "./ui/mode-toggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import LogoSvg from "./ui/logo-svg";

const Navbar = ({}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "start end"],
  });
  const [isVisible, setIsVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10) {
      console.log(latest);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });
  const { theme } = useTheme();
  const shadow =
    theme === "dark"
      ? "0 2px 8px rgba(255,255,255,0.05), 0 1px 3px rgba(255,255,255,0.08)"
      : "0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)";

  return (
    <motion.div
      className="fixed z-60 top-0  w-full bg-transparent"
      ref={ref}
      animate={{
        top: isVisible ? "10px" : "0%",
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto rounded-full  p-3 px-6 flex justify-between items-center"
        animate={{
          backdropFilter: isVisible ? "blur(10px)" : "none",
          maxWidth: isVisible ? "1000px" : "1280px",
          boxShadow: isVisible ? shadow : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 50,
        }}
      >
        <Link
          href={"/"}
          className=" text-xl gap-x-2  flex justify-center items-center"
        >
          <div className="size-10 flex justify-center items-center">
           <LogoSvg></LogoSvg>
          </div>
          <div>FastInvo</div>
        </Link>
        <div className="flex items-center gap-x-2">
          <ModeToggle className=""></ModeToggle>
          <Button
            href="/invoice"
            className="dark:bg-neutral-800 max-sm:hidden dark:text-neutral-300 hover:dark:text-neutral-100 border dark:border-neutral-50/20 border-neutral-950/20"
          >
            Generate now
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
