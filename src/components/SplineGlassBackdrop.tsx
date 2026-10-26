import React, { useEffect, useRef, useState } from 'react';

interface SplineGlassBackdropProps {
  /**
   * Optional URL to an exported Spline 3D/2D scene (.splinecode).
   * If provided, @splinetool/runtime loads and renders the interactive scene.
   * If omitted, the Apple-inspired Liquid Glass CSS/SVG optical engine renders seamlessly.
   */
  sceneUrl?: string;
  className?: string;
  isCircular?: boolean;
  children?: React.ReactNode;
}

export const SplineGlassBackdrop: React.FC<SplineGlassBackdropProps> = ({
  sceneUrl,
  className = '',
  isCircular = false,
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    if (!sceneUrl || !canvasRef.current) return;

    let app: any = null;
    let isCancelled = false;

    // Dynamically load @splinetool/runtime Application
    import('@splinetool/runtime')
      .then(({ Application }) => {
        if (isCancelled || !canvasRef.current) return;
        app = new Application(canvasRef.current);
        return app.load(sceneUrl);
      })
      .then(() => {
        if (!isCancelled) setSplineLoaded(true);
      })
      .catch((err) => {
        console.warn('Spline scene failed to load, falling back to Liquid Glass CSS engine:', err);
        if (!isCancelled) setSplineError(true);
      });

    return () => {
      isCancelled = true;
      if (app && typeof app.dispose === 'function') {
        app.dispose();
      }
    };
  }, [sceneUrl]);

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${
        isCircular ? 'liquid-glass-circle' : 'liquid-glass-surface'
      } ${className}`}
    >
      {/* Optional Spline Canvas Layer (always non-blocking for user clicks) */}
      {sceneUrl && !splineError && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 z-0 ${
            splineLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Optical Specular Sheen (Top-Left Light Source) */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: isCircular
            ? 'radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 45%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% -10%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 55%, transparent 80%)'
        }}
      />

      {/* Inner Content Slot */}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
};
