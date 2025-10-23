"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Button from "./ui/button";
import { useRef, useState } from "react";
import ModeToggle from "./ui/mode-toggle";
import { useTheme } from "next-themes";
import Link from "next/link";

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
        className="max-w-7xl mx-auto  rounded-full border border-neutral-300/20 p-3 px-6 flex justify-between items-center"
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
        <Link href={"/"} className=" text-xl gap-x-2  flex justify-center items-center">
          <div className="size-10 flex justify-center items-center">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="180"
              viewBox="210 140 200 180"
              
            >
              <path
                d="M0 0 C57.09 0 114.18 0 173 0 C173 57.09 173 114.18 173 173 C144.62 173 116.24 173 87 173 C87 171.68 87 170.36 87 169 C114.06 169 141.12 169 169 169 C169 114.55 169 60.1 169 4 C114.55 4 60.1 4 4 4 C4 31.39 4 58.78 4 87 C2.68 87 1.36 87 0 87 C0 58.29 0 29.58 0 0 Z "
                className="fill-neutral-500 dark:fill-neutral-200"
                transform="translate(221,148)"
              />v
              <path
                d="M0 0 C8.25 0 16.5 0 25 0 C25 1.65 25 3.3 25 5 C18.73 5 12.46 5 6 5 C6 12.26 6 19.52 6 27 C10.95 27 15.9 27 21 27 C21 28.65 21 30.3 21 32 C16.05 32 11.1 32 6 32 C6 40.91 6 49.82 6 59 C4.02 59 2.04 59 0 59 C0 39.53 0 20.06 0 0 Z "
                className="fill-neutral-500 dark:fill-neutral-200"
                transform="translate(298,202)"
              />
            </svg>
          </div>
          <div>
            FastInvo
          </div>
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
