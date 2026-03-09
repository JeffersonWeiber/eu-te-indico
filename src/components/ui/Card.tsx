import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = ({ className, hoverable, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white p-6 card-shadow border border-stone-100',
        hoverable && 'transition-transform hover:-translate-y-1 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
