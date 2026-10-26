import React, { useState, useEffect } from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, productName }) => {
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const measurements = [
    { size: 'S', chestCm: '58', chestIn: '22.8', lengthCm: '72', lengthIn: '28.3', shoulderCm: '52', shoulderIn: '20.5', sleeveCm: '62', sleeveIn: '24.4' },
    { size: 'M', chestCm: '61', chestIn: '24.0', lengthCm: '74', lengthIn: '29.1', shoulderCm: '54', shoulderIn: '21.3', sleeveCm: '64', sleeveIn: '25.2' },
    { size: 'L', chestCm: '64', chestIn: '25.2', lengthCm: '76', lengthIn: '29.9', shoulderCm: '56', shoulderIn: '22.0', sleeveCm: '66', sleeveIn: '26.0' },
    { size: 'XL', chestCm: '67', chestIn: '26.4', lengthCm: '78', lengthIn: '30.7', shoulderCm: '58', shoulderIn: '22.8', sleeveCm: '67', sleeveIn: '26.4' },
    { size: 'XXL', chestCm: '70', chestIn: '27.6', lengthCm: '80', lengthIn: '31.5', shoulderCm: '60', shoulderIn: '23.6', sleeveCm: '68', sleeveIn: '26.8' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-surface-container-lowest border border-surface-container-high shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-space-md sm:p-space-lg bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div>
            <span className="font-label-meta text-label-meta uppercase tracking-widest text-secondary font-bold">
              PARAMETRIC MEASUREMENT MATRIX
            </span>
            <h3 className="font-headline-sm text-headline-sm uppercase text-primary mt-0.5">
              SIZE &amp; FIT SPECIFICATION
            </h3>
            {productName && (
              <p className="font-label-code text-label-code text-on-surface-variant">
                TARGET: {productName}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-space-xs text-primary hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Unit Toggle & Instructions */}
        <div className="p-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-surface-container-high bg-surface-container-lowest">
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            Cut with relaxed dropped shoulders and architectural drape. Take your usual streetwear size for an intentional oversized silhouette, or size down for tailored fit.
          </p>

          <div className="flex border border-primary bg-surface-container-lowest">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 font-label-code text-label-code uppercase font-bold transition-colors ${
                unit === 'cm' ? 'bg-primary text-on-primary' : 'text-primary hover:bg-surface-container-low'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 font-label-code text-label-code uppercase font-bold transition-colors ${
                unit === 'inches' ? 'bg-primary text-on-primary' : 'text-primary hover:bg-surface-container-low'
              }`}
            >
              INCHES
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-space-md">
          <table className="w-full text-left font-label-code text-label-code border-collapse">
            <thead>
              <tr className="border-b-2 border-primary text-primary uppercase">
                <th className="py-2.5 px-3">SIZE</th>
                <th className="py-2.5 px-3">CHEST WIDTH</th>
                <th className="py-2.5 px-3">BODY LENGTH</th>
                <th className="py-2.5 px-3">SHOULDER</th>
                <th className="py-2.5 px-3">SLEEVE</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m) => (
                <tr key={m.size} className="border-b border-surface-container-high hover:bg-surface-container-low">
                  <td className="py-3 px-3 font-bold text-primary">{m.size}</td>
                  <td className="py-3 px-3">{unit === 'cm' ? `${m.chestCm} cm` : `${m.chestIn} in`}</td>
                  <td className="py-3 px-3">{unit === 'cm' ? `${m.lengthCm} cm` : `${m.lengthIn} in`}</td>
                  <td className="py-3 px-3">{unit === 'cm' ? `${m.shoulderCm} cm` : `${m.shoulderIn} in`}</td>
                  <td className="py-3 px-3">{unit === 'cm' ? `${m.sleeveCm} cm` : `${m.sleeveIn} in`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-space-md bg-surface-container-low border-t border-surface-container-high flex justify-between items-center font-label-meta text-[11px] text-on-surface-variant uppercase">
          <span>* Measured flat across garment. Tolerances ±1.5cm.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-on-primary font-title-sm text-xs uppercase tracking-wider hover:bg-secondary transition-colors"
          >
            CLOSE GUIDE
          </button>
        </div>
      </div>
    </div>
  );
};
