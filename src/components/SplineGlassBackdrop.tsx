import React, { useEffect, useRef, useState } from 'react';

interface SplineGlassBackdropProps {
  /**
   * Optional URL to an exported Spline 3D/2D scene (.splinecode).
   * If provided, @splinetool/runtime loads and renders the interactive scene.
   * If omitted, the Apple-inspired Liquid Glass optical engine renders seamlessly.
   */
  sceneUrl?: string;
  className?: string;
  variant?: 'chromatic' | 'surface' | 'circle' | 'pill';
  children?: React.ReactNode;
}

export const SplineGlassBackdrop: React.FC<SplineGlassBackdropProps> = ({
  sceneUrl,
  className = '',
  variant = 'chromatic',
  children
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const [pointerOffset, setPointerOffset] = useState({ x: 50, y: 50 });

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
        console.warn('Spline scene failed to load, falling back to Chromatic Liquid Glass CSS engine:', err);
        if (!isCancelled) setSplineError(true);
      });

    return () => {
      isCancelled = true;
      if (app && typeof app.dispose === 'function') {
        app.dispose();
      }
    };
  }, [sceneUrl]);

  // Subtle pointer refraction shift (desktop interactive enhancement)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100));
    setPointerOffset({ x, y });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 50, y: 50 });
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'chromatic':
        return 'liquid-glass-chromatic';
      case 'circle':
        return 'liquid-glass-circle';
      case 'pill':
        return 'liquid-glass-pill';
      case 'surface':
      default:
        return 'liquid-glass-surface';
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden transition-all duration-300 ${getVariantClass()} ${className}`}
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

      {/* Chromatic Caustic Refraction Layer (Reference 2: Blue, Violet, Magenta, Pink & Amber) */}
      {variant === 'chromatic' && (
        <>
          <div
            className="chromatic-caustic-layer z-[1]"
            style={{
              backgroundPosition: `${pointerOffset.x}% ${pointerOffset.y}%`
            }}
          />
          <div className="chromatic-specular-rim z-[2]" />
        </>
      )}

      {/* Optical Specular Sheen for circle/surface variants */}
      {variant !== 'chromatic' && (
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              variant === 'circle'
                ? 'radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 45%, transparent 70%)'
                : 'radial-gradient(ellipse at 50% -10%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 55%, transparent 80%)'
          }}
        />
      )}

      {/* Real Functional Navigation Slot (always z-[3]) */}
      <div className="relative z-[3] h-full w-full">{children}</div>
    </div>
  );
};
