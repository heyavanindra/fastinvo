import { cn } from '@/lib/utils';
import * as React from 'react';

interface TopBarProps {
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ className }) => {
  return (
    <div className={cn("w-full h-12 bg-neutral-700",className)}>
      
    </div>
  );
};

export default TopBar;