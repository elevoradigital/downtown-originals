import React from 'react';
import { cn } from '../../lib/utils';

export type TColorProp = string | string[];

export interface ShineBorderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: React.ReactNode;
}

export const ShineBorder: React.FC<ShineBorderProps> = ({
  borderRadius = 0,
  borderWidth = 1,
  duration = 14,
  color = ['#245BFF', '#FFFFFF', '#245BFF'],
  className,
  children,
  ...props
}) => {
  const colorString = Array.isArray(color) ? color.join(', ') : color;

  return (
    <div
      style={
        {
          '--border-radius': `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        'relative isolate overflow-hidden rounded-[--border-radius]',
        className
      )}
      {...props}
    >
      {/* 
        Mobile Optimization:
        On screens < 768px (md:), the continuous radial shine gradient animation is paused (animate-none)
        and renders as a refined, restrained border with subtle opacity.
        On desktop (md:), the full dynamic animated shine activates.
      */}
      <div
        style={
          {
            '--border-width': `${borderWidth}px`,
            '--border-radius': `${borderRadius}px`,
            '--duration': `${duration}s`,
            '--mask-linear-gradient': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            '--background-radial-gradient': `radial-gradient(transparent 25%, ${colorString}, transparent 75%)`,
          } as React.CSSProperties
        }
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full rounded-[--border-radius] p-[--border-width] will-change-[background-position] ![-webkit-mask-composite:xor] ![mask-composite:exclude] [background-image:var(--background-radial-gradient)] [background-size:300%_300%] [mask:var(--mask-linear-gradient)] opacity-50 md:opacity-80 md:motion-safe:animate-shine z-20 transition-opacity"
      />
      {children}
    </div>
  );
};
