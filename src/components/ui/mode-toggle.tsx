"use client";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useState } from "react";

const ModeToggle = ({ className }: { className: string }) => {
  const [isOn, setIsOn] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggleHandler = () => {
    setIsOn(!isOn);
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  return (
    <div
      onClick={toggleHandler}
      className={`flex-start items-center flex h-5 py-3 w-12 rounded-[50px] bg-zinc-100 px-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${theme === "dark" && "place-content-end"}`}
    >
      <motion.div
        className="flex size-fit items-center justify-center rounded-full "
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        <motion.div whileTap={{ rotate: 180 }}>
          {theme === "light" ? (
            <SunIcon className="size-4 text-neutral-900" />
          ) : (
            <MoonIcon className="size-4  text-slate-200" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModeToggle;
