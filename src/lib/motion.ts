import { Variants, Transition } from 'framer-motion';

/**
 * EDITORIAL STREETWEAR MOTION TOKENS
 * Standardized timing, easing, and tactile feedback curves.
 */
export const MOTION_TIMINGS = {
  micro: 0.15,      // 150ms - micro-interactions, toggles, icons
  button: 0.2,      // 200ms - button active & hover states
  standard: 0.3,    // 300ms - card hovers, modal backdrops
  editorial: 0.5,   // 500ms - section reveals, image crossfades
  hero: 0.75,       // 750ms - hero entrance choreography
} as const;

export const MOTION_EASINGS = {
  editorial: [0.22, 1, 0.36, 1] as const,    // Luxury streetwear decelerate curve
  smoothInOut: [0.65, 0, 0.35, 1] as const,  // Image transitions & drawers
  snappy: [0.16, 1, 0.3, 1] as const,        // Quick UI responsive feedback
} as const;

export const TACTILE_SPRING: Transition = {
  type: 'spring',
  stiffness: 450,
  damping: 30,
};

export const GENTLE_SPRING: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
};

/**
 * Editorial Image Reveal Variant:
 * Image starts slightly scaled up and masked, then reveals with crisp focus.
 */
export const editorialImageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.06,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: MOTION_TIMINGS.editorial + 0.15,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

/**
 * Stagger Container Factory
 */
export const createStaggerContainer = (staggerDelay = 0.08, initialDelay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

/**
 * Editorial Item Fade Up
 */
export const editorialFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TIMINGS.editorial,
      ease: MOTION_EASINGS.editorial,
    },
  },
};
