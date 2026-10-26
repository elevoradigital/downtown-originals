import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '../../lib/utils';
import { MOBILE_MOTION_TIMINGS, MOTION_TIMINGS, MOTION_EASINGS } from '../../lib/motion';

export interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className,
  variant,
  duration,
  delay = 0,
  yOffset = 6,
  inView = true,
  inViewMargin,
  blur = '4px',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Screen width detection for lightweight mobile motion
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On mobile, use 0px or slight positive rootMargin to trigger immediately without pop-in lag
  const resolvedMargin = inViewMargin ?? (isMobile ? '20px' : '-20px');
  const inViewResult = useInView(ref, { once: true, margin: resolvedMargin as any });
  const isInView = !inView || inViewResult;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Mobile optimization: shorter duration, smaller travel distance, no blur rasterization cost
  const resolvedDuration = duration ?? (isMobile ? MOBILE_MOTION_TIMINGS.editorial : MOTION_TIMINGS.editorial);
  const resolvedYOffset = isMobile ? Math.min(yOffset, 5) : yOffset;
  const resolvedBlur = isMobile ? '0px' : blur;
  const resolvedEase = isMobile ? MOTION_EASINGS.snappy : MOTION_EASINGS.editorial;

  const defaultVariants: Variants = {
    hidden: {
      y: resolvedYOffset,
      opacity: 0,
      filter: resolvedBlur !== '0px' ? `blur(${resolvedBlur})` : 'none',
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'none',
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={combinedVariants}
      transition={{
        delay,
        duration: resolvedDuration,
        ease: resolvedEase,
      }}
      className={cn('transform-gpu', className)}
    >
      {children}
    </motion.div>
  );
};
