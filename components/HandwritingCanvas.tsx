
import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';

interface HandwritingCanvasProps {
  onDrawComplete?: () => void;
}

export interface HandwritingCanvasHandle {
  getDrawing: () => string | undefined;
  clear: () => void;
}

export const HandwritingCanvas = forwardRef<HandwritingCanvasHandle, HandwritingCanvasProps>(({ onDrawComplete }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useImperativeHandle(ref, () => ({
    getDrawing: () => canvasRef.current?.toDataURL('image/png'),
    clear: () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const container = containerRef.current;
      if (container) {
        // We set fixed attributes to avoid scaling issues
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Reset context properties after resize as they are cleared
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 12;
        ctx.strokeStyle = '#0f172a'; // Slate-900
      }
    };

    // Use a small timeout to ensure layout is stable
    const timer = setTimeout(resize, 50);
    window.addEventListener('resize', resize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (onDrawComplete) onDrawComplete();
    }
  };

  const clearCanvas = (e: React.MouseEvent) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-30 touch-none cursor-crosshair block"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button 
        onClick={clearCanvas}
        className="absolute bottom-6 right-6 z-40 p-4 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl transition-all shadow-xl active:scale-90"
        title="Clear Pad"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
});
