"use client";
import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";

const TopLoader = () => {
  const { theme } = useTheme();
  return (
    <NextTopLoader
      height={4}
      showSpinner={false}
      color={
        theme === "dark"
          ? "var(--color-neutral-400)"
          : "var(--color-neutral-900)"
      }
    ></NextTopLoader>
  );
};

export default TopLoader;
