import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '../../lib/utils';
import { MOBILE_MOTION_TIMINGS, MOTION_TIMINGS, MOTION_EASINGS } from '../../lib/motion';

export type AnimationType = 'text' | 'word' | 'character' | 'line';
export type AnimationVariant = 'fadeIn' | 'fadeInUp' | 'blurIn' | 'blurInUp' | 'slideUp';

export interface TextAnimateProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: React.ElementType;
  by?: AnimationType;
  startOnView?: boolean;
  once?: boolean;
  animation?: AnimationVariant;
  segmentClassName?: string;
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  children,
  className,
  delay = 0,
  duration,
  stagger,
  as: Component = 'div',
  by = 'word',
  startOnView = true,
  once = true,
  animation = 'blurInUp',
  segmentClassName,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inViewResult = useInView(ref, { once });
  const shouldReduceMotion = useReducedMotion();
  const isInView = !startOnView || inViewResult;

  // Lightweight mobile detection for performance optimization
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

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  // Mobile-adapted timing & stagger
  const resolvedDuration = duration ?? (isMobile ? MOBILE_MOTION_TIMINGS.hero : MOTION_TIMINGS.editorial);
  const resolvedStagger = stagger ?? (isMobile ? 0.04 : 0.06);
  const resolvedEasing = isMobile ? MOTION_EASINGS.snappy : MOTION_EASINGS.editorial;

  // On mobile screens, replace heavy blur filter with clean transform/opacity to save GPU rasterization
  const getVariants = (): Variants => {
    switch (animation) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: resolvedDuration, ease: resolvedEasing } },
        };
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: isMobile ? 8 : 14 },
          visible: { opacity: 1, y: 0, transition: { duration: resolvedDuration, ease: resolvedEasing } },
        };
      case 'blurIn':
        return {
          hidden: { opacity: 0, filter: isMobile ? 'none' : 'blur(4px)' },
          visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: resolvedDuration, ease: resolvedEasing } },
        };
      case 'fadeInUp':
        return {
          hidden: { opacity: 0, y: isMobile ? 6 : 10 },
          visible: { opacity: 1, y: 0, transition: { duration: resolvedDuration, ease: resolvedEasing } },
        };
      case 'blurInUp':
      default:
        return {
          hidden: {
            opacity: 0,
            y: isMobile ? 8 : 12,
            filter: isMobile ? 'none' : 'blur(4px)',
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: resolvedDuration, ease: resolvedEasing },
          },
        };
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: resolvedStagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = getVariants();

  // Segment text depending on `by` (on mobile, words or lines are preferred over character-by-character)
  const effectiveBy = isMobile && by === 'character' ? 'word' : by;

  if (effectiveBy === 'line') {
    const lines = children.split('\n');
    return (
      <Component ref={ref} className={cn('block overflow-hidden', className)}>
        <motion.span
          className="block"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {lines.map((line, idx) => (
            <motion.span
              key={idx}
              variants={itemVariants}
              className={cn('block transform-gpu', segmentClassName)}
            >
              {line}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }

  if (effectiveBy === 'word') {
    const lines = children.split('\n');
    return (
      <Component ref={ref} className={cn('block', className)}>
        <motion.span
          className="block"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {lines.map((line, lineIdx) => {
            const words = line.split(' ');
            return (
              <span key={lineIdx} className="block">
                {words.map((word, wordIdx) => (
                  <React.Fragment key={wordIdx}>
                    <motion.span
                      variants={itemVariants}
                      className={cn('inline-block transform-gpu', segmentClassName)}
                    >
                      {word}
                    </motion.span>
                    {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                  </React.Fragment>
                ))}
              </span>
            );
          })}
        </motion.span>
      </Component>
    );
  }

  if (effectiveBy === 'character') {
    const characters = Array.from(children);
    return (
      <Component ref={ref} className={cn('inline-block', className)}>
        <motion.span
          className="inline-block"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {characters.map((char, idx) => (
            <motion.span
              key={idx}
              variants={itemVariants}
              className={cn('inline-block transform-gpu', segmentClassName)}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }

  // effectiveBy === 'text'
  return (
    <Component ref={ref} className={className}>
      <motion.span
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={itemVariants}
        transition={{ delay, duration: resolvedDuration, ease: resolvedEasing }}
        className={cn('inline-block transform-gpu', segmentClassName)}
      >
        {children}
      </motion.span>
    </Component>
  );
};
