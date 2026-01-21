import React from 'react';
import type { Point, Line } from '../types';
import { GRID_SIZE, GRID_STEP, isSamePoint } from '../utils/geometry';

interface GeoboardProps {
  lines: Line[];
  drawingStart: Point | null;
  mousePos: { x: number; y: number } | null;
  onPointClick: (x: number, y: number) => void;
  onMouseMove: (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => void;
  svgRef: React.RefObject<SVGSVGElement>;
}

const Geoboard: React.FC<GeoboardProps> = ({
  lines,
  drawingStart,
  mousePos,
  onPointClick,
  onMouseMove,
  svgRef
}) => {
  const BOARD_PIXEL_SIZE = GRID_STEP * (GRID_SIZE - 1);
  const PADDING = 20;
  const VIEWBOX_SIZE = BOARD_PIXEL_SIZE + (PADDING * 2);

  return (
    <div className="relative select-none touch-none mx-auto bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
      <svg 
        ref={svgRef}
        width={BOARD_PIXEL_SIZE} 
        height={BOARD_PIXEL_SIZE} 
        viewBox={`-${PADDING} -${PADDING} ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} 
        className="bg-orange-50 rounded-lg shadow-inner border-2 border-orange-200 cursor-crosshair"
        onMouseMove={onMouseMove}
        onTouchMove={onMouseMove}
      >
        {/* Grid Lines (Faint) */}
        <defs>
          <pattern id="grid" width={GRID_STEP} height={GRID_STEP} patternUnits="userSpaceOnUse">
            <path d={`M ${GRID_STEP} 0 L 0 0 0 ${GRID_STEP}`} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={BOARD_PIXEL_SIZE} height={BOARD_PIXEL_SIZE} fill="url(#grid)" />

        {/* Existing Lines */}
        {lines.map((line) => {
          const x1 = line.start.x * GRID_STEP;
          const y1 = line.start.y * GRID_STEP;
          const x2 = line.end.x * GRID_STEP;
          const y2 = line.end.y * GRID_STEP;
          const isStatic = line.type === 'static';
          
          return (
            <g key={line.id} style={{pointerEvents: 'none'}}>
              <line 
                x1={x1} y1={y1} x2={x2} y2={y2} 
                stroke={isStatic ? '#1e293b' : '#3b82f6'} 
                strokeWidth={isStatic ? '4' : '4'} 
                strokeLinecap="round"
                className="transition-all"
              />
            </g>
          );
        })}

        {/* Rubber Band Preview Line */}
        {drawingStart && mousePos && (
          <line 
            x1={drawingStart.x * GRID_STEP} 
            y1={drawingStart.y * GRID_STEP} 
            x2={mousePos.x} 
            y2={mousePos.y} 
            stroke="#3b82f6" 
            strokeWidth="3" 
            strokeDasharray="5,5"
            className="opacity-70"
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Dots */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isStart = drawingStart && isSamePoint(drawingStart, {x, y});

          return (
            <circle
              key={`${x}-${y}`}
              cx={x * GRID_STEP}
              cy={y * GRID_STEP}
              r={isStart ? 6 : 4} 
              className={`
                transition-all cursor-pointer
                ${isStart ? 'fill-blue-600' : 'fill-slate-400 hover:fill-blue-400 hover:r-6'}
              `}
              onClick={() => onPointClick(x, y)}
            />
          );
        })}
      </svg>

      {/* Status Text under board */}
      <div className="mt-2 text-center text-sm text-slate-500 font-medium">
        {drawingStart ? "移動滑鼠拉線，再次點擊固定..." : "點擊任一點開始畫線"}
      </div>
    </div>
  );
};

export default Geoboard;
