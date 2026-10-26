import { Variants, Transition } from 'framer-motion';

/**
 * EDITORIAL STREETWEAR MOTION TOKENS
 * Desktop & Mobile Standardized Timing, Easing, and Tactile Feedback Curves.
 * 
 * Philosophy: LIGHTWEIGHT EDITORIAL ENERGY
 * Mobile motion is shorter, lighter, and more intentional than desktop motion.
 */

// Desktop Timings
export const MOTION_TIMINGS = {
  micro: 0.15,      // 150ms - micro-interactions, toggles, icons
  button: 0.2,      // 200ms - button active & hover states
  standard: 0.3,    // 300ms - card hovers, modal backdrops
  editorial: 0.5,   // 500ms - section reveals, image crossfades
  hero: 0.75,       // 750ms - hero entrance choreography
} as const;

// Mobile-Optimized Lightweight Timings (< 768px)
export const MOBILE_MOTION_TIMINGS = {
  micro: 0.12,      // 120ms - instantaneous tactile touch feedback
  button: 0.16,     // 160ms - snappy button tap response
  standard: 0.22,   // 220ms - fast modal/drawer transitions
  editorial: 0.35,  // 350ms - lightweight editorial scroll reveals
  hero: 0.45,       // 450ms - crisp, immediate hero entrance
} as const;

// Luxury Streetwear Curves
export const MOTION_EASINGS = {
  editorial: [0.22, 1, 0.36, 1] as const,    // Luxury streetwear decelerate curve
  smoothInOut: [0.65, 0, 0.35, 1] as const,  // Image transitions & drawers
  snappy: [0.16, 1, 0.3, 1] as const,        // Quick mobile UI responsive feedback
} as const;

// Spring Configurations
export const TACTILE_SPRING: Transition = {
  type: 'spring',
  stiffness: 450,
  damping: 30,
};

export const MOBILE_TACTILE_SPRING: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
};

export const GENTLE_SPRING: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
};

/**
 * Desktop Editorial Image Reveal Variant:
 * Image starts slightly scaled up and masked, then reveals with crisp focus.
 */
export const editorialImageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.04,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: MOTION_TIMINGS.editorial,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

/**
 * Mobile Lightweight Image Reveal Variant:
 * Avoids expensive blur filter computations on mobile GPUs while preserving editorial feel.
 */
export const mobileImageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.01,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOBILE_MOTION_TIMINGS.editorial,
      ease: MOTION_EASINGS.snappy,
    },
  },
};

/**
 * Stagger Container Factory
 */
export const createStaggerContainer = (staggerDelay = 0.06, initialDelay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

/**
 * Editorial Item Fade Up (Desktop)
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

/**
 * Mobile Lightweight Item Fade Up
 * Shorter travel distance (6px) and faster duration for immediate responsiveness.
 */
export const mobileFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOBILE_MOTION_TIMINGS.editorial,
      ease: MOTION_EASINGS.snappy,
    },
  },
};
