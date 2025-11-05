import React, { useState, useRef, useCallback } from 'react';

interface ImageCompareSliderProps {
  before: string;
  after: string;
}

const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const handleGlobalMouseMove = (event: MouseEvent) => handleMove(event.clientX);
    const handleGlobalMouseUp = () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const handleGlobalTouchMove = (event: TouchEvent) => handleMove(event.touches[0].clientX);
    const handleGlobalTouchEnd = () => {
        window.removeEventListener('touchmove', handleGlobalTouchMove);
        window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
    window.addEventListener('touchmove', handleGlobalTouchMove);
    window.addEventListener('touchend', handleGlobalTouchEnd);
  };

  return (
    <div className="w-full flex flex-col items-center p-2">
      <span className="text-lg font-medium text-gray-400 mb-2">Result (Slide to compare)</span>
      <div
        ref={containerRef}
        className="relative w-full max-w-lg aspect-square rounded-lg overflow-hidden select-none cursor-ew-resize"
      >
        <img
          src={before}
          alt="Before"
          className="absolute w-full h-full object-contain pointer-events-none"
        />
        <div
          className="absolute w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={after}
            alt="After"
            className="absolute w-full h-full object-contain pointer-events-none"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/50"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-lg text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompareSlider;