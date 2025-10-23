import { cn } from "@/lib/utils";
import * as React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?:string
}

const Container: React.FC<ContainerProps> = ({ children ,className}) => {
  return <div className={cn("relative max-w-7xl mx-auto",className)}>{children}</div>;
};

export default Container;
