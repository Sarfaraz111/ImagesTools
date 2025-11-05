import React, { useState, useRef, MouseEvent } from 'react';

interface WatermarkSelectorProps {
  imageUrl: string;
  onAreaSelect: (area: { x: number; y: number; width: number; height: number } | null) => void;
}

const WatermarkSelector: React.FC<WatermarkSelectorProps> = ({ imageUrl, onAreaSelect }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selection, setSelection] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const getCoords = (e: MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCoords(e);
    setStartPos(coords);
    setSelection(null);
    onAreaSelect(null);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    const coords = getCoords(e);
    const x = Math.min(startPos.x, coords.x);
    const y = Math.min(startPos.y, coords.y);
    const width = Math.abs(startPos.x - coords.x);
    const height = Math.abs(startPos.y - coords.y);
    setSelection({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (selection && imageRef.current && selection.width > 0 && selection.height > 0) {
      const { naturalWidth, naturalHeight, clientWidth, clientHeight } = imageRef.current;
      const scaleX = naturalWidth / clientWidth;
      const scaleY = naturalHeight / clientHeight;
      const naturalSelection = {
        x: selection.x * scaleX,
        y: selection.y * scaleY,
        width: selection.width * scaleX,
        height: selection.height * scaleY,
      };
      onAreaSelect(naturalSelection);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-lg font-medium text-gray-400 mb-4">Click and drag on the image to select the watermark area.</p>
      <div
        ref={containerRef}
        className="relative w-full max-w-lg aspect-square bg-gray-700 rounded-lg overflow-hidden cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Original"
          className="w-full h-full object-contain pointer-events-none select-none"
        />
        {selection && (
          <div
            className="absolute border-2 border-dashed border-indigo-400 bg-indigo-400 bg-opacity-25 pointer-events-none"
            style={{
              left: selection.x,
              top: selection.y,
              width: selection.width,
              height: selection.height,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WatermarkSelector;