"use client"
import { cn } from '@/lib/utils';
import * as React from 'react';
import {motion} from "motion/react"
import { IconLink } from '@tabler/icons-react';
import Link from 'next/link';
interface ButtonProps {
  className?: string;
  children?:React.ReactNode,
  href:string
}

const Button: React.FC<ButtonProps> = ({ className ,children ,href}) => {
  return (
    <Link href={href}>
    <motion.div className={cn("bg-neutral-100  px-2 py-1 rounded-lg text-neutral-500 font-semibold hover:text-neutral-950 cursor-pointer transition-colors duration-300 ease-in-out flex items-center justify-center gap-x-2",className)}>
    {children}
    <IconLink className='size-5'></IconLink>
    </motion.div>
    </Link>
  );
};

export default Button;