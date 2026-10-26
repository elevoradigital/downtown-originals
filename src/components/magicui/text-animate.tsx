import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '../../lib/utils';

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
  duration = 0.45,
  stagger = 0.08,
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

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  // Animation presets
  const getVariants = (): Variants => {
    switch (animation) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, ease: [0.25, 0.1, 0.25, 1] } },
        };
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration, ease: [0.25, 0.1, 0.25, 1] } },
        };
      case 'blurIn':
        return {
          hidden: { opacity: 0, filter: 'blur(6px)' },
          visible: { opacity: 1, filter: 'blur(0px)', transition: { duration, ease: [0.25, 0.1, 0.25, 1] } },
        };
      case 'fadeInUp':
        return {
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0, transition: { duration, ease: [0.25, 0.1, 0.25, 1] } },
        };
      case 'blurInUp':
      default:
        return {
          hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
          },
        };
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = getVariants();

  // Segment text depending on `by`
  if (by === 'line') {
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
              className={cn('block', segmentClassName)}
            >
              {line}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }

  if (by === 'word') {
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
                      className={cn('inline-block will-change-transform', segmentClassName)}
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

  if (by === 'character') {
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
              className={cn('inline-block will-change-transform', segmentClassName)}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }

  // by === 'text'
  return (
    <Component ref={ref} className={className}>
      <motion.span
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={itemVariants}
        transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn('inline-block', segmentClassName)}
      >
        {children}
      </motion.span>
    </Component>
  );
};
