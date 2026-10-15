import React, { useRef } from 'react';
import type { ParallelLinesState } from '../types/figures';
import { MathText } from '../components/MathText';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { LabelInput } from '../components/Controls/LabelInput';
import { Checkbox } from '../components/Controls/Checkbox';
import { degToRad, describeArc } from '../engine/math';

interface ParallelLinesProps {
  state: ParallelLinesState;
  onChange: (newState: ParallelLinesState) => void;
}

export const defaultParallelLinesState: ParallelLinesState = {
  spacing: 120,
  transversalAngle: 55, // deg from horizontal
  showParallelArrows: true,
  angles: [
    { pos: 1, label: { mode: 'text', text: '1' }, showArc: true, style: 'single' },
    { pos: 2, label: { mode: 'text', text: '2' }, showArc: false, style: 'single' },
    { pos: 3, label: { mode: 'text', text: '3' }, showArc: false, style: 'single' },
    { pos: 4, label: { mode: 'text', text: '4' }, showArc: false, style: 'single' },
    { pos: 5, label: { mode: 'text', text: '5' }, showArc: true, style: 'single' },
    { pos: 6, label: { mode: 'text', text: '6' }, showArc: false, style: 'single' },
    { pos: 7, label: { mode: 'text', text: '7' }, showArc: false, style: 'single' },
    { pos: 8, label: { mode: 'text', text: '8' }, showArc: false, style: 'single' },
  ],
  color: true,
};

export const ParallelLines: React.FC<ParallelLinesProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Line coordinates
  const y1 = 140;
  const y2 = y1 + state.spacing;
  const xLeft = 60;
  const xRight = 480;

  // Intersections of transversal with horizontal lines
  const centerCy = (y1 + y2) / 2;
  const centerCx = 270;
  const rad = degToRad(state.transversalAngle);

  // x = cx - (y - centerCy)/tan(rad)
  const tan = Math.tan(rad);
  const ix1 = centerCx - (y1 - centerCy) / tan;
  const ix2 = centerCx - (y2 - centerCy) / tan;

  // Transversal line extent
  const extendY = 50;
  const txTop = centerCx - (y1 - extendY - centerCy) / tan;
  const tyTop = y1 - extendY;
  const txBot = centerCx - (y2 + extendY - centerCy) / tan;
  const tyBot = y2 + extendY;

  // Compute position offsets for the 8 angle sectors:
  // Around intersection:
  // Pos 1: Top-Right (acute)
  // Pos 2: Top-Left (obtuse)
  // Pos 3: Bottom-Left (acute)
  // Pos 4: Bottom-Right (obtuse)
  const getAngleSector = (ix: number, iy: number, pos: number) => {
    const r = 36;
    switch (pos) {
      case 1:
        return {
          arc: describeArc(ix, iy, 26, 0, state.transversalAngle),
          labelPos: { x: ix + r * 0.9, y: iy - r * 0.4 },
        };
      case 2:
        return {
          arc: describeArc(ix, iy, 26, state.transversalAngle, 180),
          labelPos: { x: ix - r * 0.8, y: iy - r * 0.6 },
        };
      case 3:
        return {
          arc: describeArc(ix, iy, 26, 180, 180 + state.transversalAngle),
          labelPos: { x: ix - r * 0.9, y: iy + r * 0.6 },
        };
      case 4:
        return {
          arc: describeArc(ix, iy, 26, 180 + state.transversalAngle, 360),
          labelPos: { x: ix + r * 0.8, y: iy + r * 0.7 },
        };
      default:
        return { arc: '', labelPos: { x: ix, y: iy } };
    }
  };

  const updateAngle = (pos: number, partial: Partial<ParallelLinesState['angles'][0]>) => {
    const updated = state.angles.map((a) => (a.pos === pos ? { ...a, ...partial } : a));
    onChange({ ...state, angles: updated });
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas - Sticky Studio Viewport */}
      <div className="flex-1 w-full flex flex-col items-center lg:sticky lg:top-24">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename="parallel-lines"
            dimensions={{ width: 540, height: 380 }}
            onReset={() => onChange(defaultParallelLinesState)}
          />

          <div className="w-full flex justify-center py-4 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 540 380"
              className="w-full max-w-[540px] h-auto select-none"
              style={{ maxHeight: '400px' }}
            >
              <defs>
                <marker
                  id="line-arrow"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b" />
                </marker>
              </defs>

              {/* Parallel Horizontal Line 1 */}
              <line
                x1={xLeft}
                y1={y1}
                x2={xRight}
                y2={y1}
                stroke="#1e293b"
                strokeWidth="2.5"
                markerStart="url(#line-arrow)"
                markerEnd="url(#line-arrow)"
              />
              {/* Parallel Horizontal Line 2 */}
              <line
                x1={xLeft}
                y1={y2}
                x2={xRight}
                y2={y2}
                stroke="#1e293b"
                strokeWidth="2.5"
                markerStart="url(#line-arrow)"
                markerEnd="url(#line-arrow)"
              />

              {/* Transversal Line */}
              <line
                x1={txBot}
                y1={tyBot}
                x2={txTop}
                y2={tyTop}
                stroke={state.color ? '#d97706' : '#1e293b'}
                strokeWidth="2.5"
                markerStart="url(#line-arrow)"
                markerEnd="url(#line-arrow)"
              />

              {/* Parallel Indicator Arrows on Lines (>) */}
              {state.showParallelArrows && (
                <g stroke="#1e293b" strokeWidth="2.2" fill="none">
                  {/* Top line arrows */}
                  <path d={`M 140 ${y1 - 6} L 148 ${y1} L 140 ${y1 + 6}`} />
                  <path d={`M 146 ${y1 - 6} L 154 ${y1} L 146 ${y1 + 6}`} />
                  {/* Bottom line arrows */}
                  <path d={`M 140 ${y2 - 6} L 148 ${y2} L 140 ${y2 + 6}`} />
                  <path d={`M 146 ${y2 - 6} L 154 ${y2} L 146 ${y2 + 6}`} />
                </g>
              )}

              {/* Render 8 Angles */}
              {state.angles.map((ang) => {
                const isTop = ang.pos <= 4;
                const ix = isTop ? ix1 : ix2;
                const iy = isTop ? y1 : y2;
                const localPos = isTop ? ang.pos : ang.pos - 4;
                const sec = getAngleSector(ix, iy, localPos);

                return (
                  <g key={ang.pos}>
                    {ang.showArc && (
                      <path
                        d={sec.arc}
                        fill="none"
                        stroke={state.color ? '#dc2626' : '#1e293b'}
                        strokeWidth="1.75"
                      />
                    )}
                    {ang.label.mode !== 'none' && (
                      <MathText
                        x={sec.labelPos.x}
                        y={sec.labelPos.y}
                        label={ang.label}
                        fontSize={17}
                        color={ang.showArc ? '#dc2626' : '#1e293b'}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Lines Configuration
          </h3>

          <Slider
            label="Line Spacing"
            value={state.spacing}
            min={90}
            max={160}
            step={5}
            unit="px"
            onChange={(spacing) => onChange({ ...state, spacing })}
          />

          <Slider
            label="Transversal Angle"
            value={state.transversalAngle}
            min={35}
            max={75}
            step={1}
            unit="°"
            onChange={(transversalAngle) => onChange({ ...state, transversalAngle })}
          />

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Show parallel arrow marks (>>)"
              checked={state.showParallelArrows}
              onChange={(showParallelArrows) =>
                onChange({ ...state, showParallelArrows })
              }
            />
            <Checkbox
              label="Enable textbook color accents"
              checked={state.color}
              onChange={(color) => onChange({ ...state, color })}
            />
          </div>
        </div>

        {/* Selected Angles Manager */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4 max-h-[360px] overflow-y-auto">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Angles (1–8)
          </h3>

          {state.angles.map((ang) => (
            <div key={ang.pos} className="flex items-center justify-between gap-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-xs text-slate-700 w-6">∠{ang.pos}</span>
              <div className="flex-1">
                <LabelInput
                  label=""
                  value={ang.label}
                  onChange={(label) => updateAngle(ang.pos, { label })}
                />
              </div>
              <Checkbox
                label="Arc"
                checked={ang.showArc}
                onChange={(showArc) => updateAngle(ang.pos, { showArc })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
