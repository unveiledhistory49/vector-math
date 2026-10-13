import React, { useRef } from 'react';
import type { QuadrilateralState } from '../types/figures';
import { MathText } from '../components/MathText';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { SegmentedControl } from '../components/Controls/SegmentedControl';
import { LabelInput } from '../components/Controls/LabelInput';
import { Checkbox } from '../components/Controls/Checkbox';

interface QuadrilateralProps {
  state: QuadrilateralState;
  onChange: (newState: QuadrilateralState) => void;
}

export const defaultQuadrilateralState: QuadrilateralState = {
  type: 'parallelogram',
  width: 240,
  height: 140,
  slantOffset: 50,
  topWidth: 160,
  showAltitude: true,
  showCongruenceTicks: true,
  showDiagonals: false,
  topLabel: { mode: 'text', text: 'b_1' },
  bottomLabel: { mode: 'text', text: 'b_2' },
  leftLabel: { mode: 'text', text: 'a' },
  rightLabel: { mode: 'text', text: 'a' },
  heightLabel: { mode: 'text', text: 'h' },
  color: true,
};

export const Quadrilateral: React.FC<QuadrilateralProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Origin for bottom-left vertex A
  const ax = 120;
  const ay = 280;

  // Bottom-right B
  const bx = ax + state.width;
  const by = ay;

  // Top vertices C (top-right) and D (top-left)
  let dx = ax;
  let dy = ay - state.height;
  let cx = bx;
  let cy = dy;

  if (state.type === 'rectangle') {
    dx = ax;
    cx = bx;
  } else if (state.type === 'parallelogram') {
    dx = ax + state.slantOffset;
    cx = bx + state.slantOffset;
  } else if (state.type === 'trapezoid') {
    // Isosceles trapezoid or offset trapezoid
    const diff = (state.width - state.topWidth) / 2;
    dx = ax + diff;
    cx = dx + state.topWidth;
  }

  // Midpoints for labels
  const midBottom = { x: (ax + bx) / 2, y: ay + 24 };
  const midTop = { x: (dx + cx) / 2, y: dy - 12 };
  const midLeft = { x: (ax + dx) / 2 - 20, y: (ay + dy) / 2 };
  const midRight = { x: (bx + cx) / 2 + 20, y: (by + cy) / 2 };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas */}
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename={`quadrilateral-${state.type}`}
            onReset={() => onChange(defaultQuadrilateralState)}
          />

          <div className="w-full flex justify-center py-4 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 540 380"
              className="w-full max-w-[540px] h-auto select-none"
              style={{ maxHeight: '400px' }}
            >
              <defs>
                <style>{`
                  .fig-stroke { stroke: ${state.color ? '#1e293b' : '#000000'}; }
                  .fig-fill { fill: ${state.color ? '#f8fafc' : '#ffffff'}; }
                `}</style>
              </defs>

              {/* Polygon Body */}
              <polygon
                points={`${ax},${ay} ${bx},${by} ${cx},${cy} ${dx},${dy}`}
                className="fig-fill fig-stroke"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Diagonals */}
              {state.showDiagonals && (
                <g stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5,5">
                  <line x1={ax} y1={ay} x2={cx} y2={cy} />
                  <line x1={bx} y1={by} x2={dx} y2={dy} />
                </g>
              )}

              {/* Right angle marker for rectangle */}
              {state.type === 'rectangle' && (
                <path
                  d={`M ${ax + 16} ${ay} L ${ax + 16} ${ay - 16} L ${ax} ${ay - 16}`}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />
              )}

              {/* Altitude line h */}
              {state.showAltitude && state.type !== 'rectangle' && (
                <g>
                  <line
                    x1={dx}
                    y1={dy}
                    x2={dx}
                    y2={ay}
                    stroke="#dc2626"
                    strokeWidth="1.75"
                    strokeDasharray="4,4"
                  />
                  {/* Square marker at foot */}
                  <path
                    d={`M ${dx + 12} ${ay} L ${dx + 12} ${ay - 12} L ${dx} ${ay - 12}`}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="1.5"
                  />
                  {state.heightLabel.mode !== 'none' && (
                    <MathText
                      x={dx + 14}
                      y={(dy + ay) / 2}
                      label={state.heightLabel}
                      fontSize={18}
                      color="#dc2626"
                    />
                  )}
                </g>
              )}

              {/* Congruence Tick Marks on opposite sides */}
              {state.showCongruenceTicks && (
                <g stroke="#1e293b" strokeWidth="2">
                  {/* Left side single tick */}
                  <line
                    x1={midLeft.x + 12}
                    y1={midLeft.y - 6}
                    x2={midLeft.x + 28}
                    y2={midLeft.y + 6}
                  />
                  {/* Right side single tick */}
                  <line
                    x1={midRight.x - 28}
                    y1={midRight.y - 6}
                    x2={midRight.x - 12}
                    y2={midRight.y + 6}
                  />
                </g>
              )}

              {/* Dimension Labels */}
              {state.bottomLabel.mode !== 'none' && (
                <MathText
                  x={midBottom.x}
                  y={midBottom.y}
                  label={state.bottomLabel}
                  fontSize={19}
                />
              )}
              {state.topLabel.mode !== 'none' && (
                <MathText
                  x={midTop.x}
                  y={midTop.y}
                  label={state.topLabel}
                  fontSize={19}
                />
              )}
              {state.leftLabel.mode !== 'none' && (
                <MathText
                  x={midLeft.x}
                  y={midLeft.y}
                  label={state.leftLabel}
                  fontSize={19}
                />
              )}
              {state.rightLabel.mode !== 'none' && (
                <MathText
                  x={midRight.x}
                  y={midRight.y}
                  label={state.rightLabel}
                  fontSize={19}
                />
              )}

              {/* Vertices */}
              <circle cx={ax} cy={ay} r="3" fill="#1e293b" />
              <circle cx={bx} cy={by} r="3" fill="#1e293b" />
              <circle cx={cx} cy={cy} r="3" fill="#1e293b" />
              <circle cx={dx} cy={dy} r="3" fill="#1e293b" />
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Polygon Shape
          </h3>

          <SegmentedControl<QuadrilateralState['type']>
            label="Quadrilateral"
            value={state.type}
            options={[
              { value: 'rectangle', label: 'Rectangle' },
              { value: 'parallelogram', label: 'Parallelogram' },
              { value: 'trapezoid', label: 'Trapezoid' },
            ]}
            onChange={(type) => onChange({ ...state, type })}
          />

          <Slider
            label="Base Width"
            value={state.width}
            min={160}
            max={320}
            step={10}
            unit="px"
            onChange={(width) => onChange({ ...state, width })}
          />

          <Slider
            label="Height"
            value={state.height}
            min={80}
            max={200}
            step={10}
            unit="px"
            onChange={(height) => onChange({ ...state, height })}
          />

          {state.type === 'parallelogram' && (
            <Slider
              label="Slant Offset"
              value={state.slantOffset}
              min={20}
              max={100}
              step={5}
              unit="px"
              onChange={(slantOffset) => onChange({ ...state, slantOffset })}
            />
          )}

          {state.type === 'trapezoid' && (
            <Slider
              label="Top Base Width"
              value={state.topWidth}
              min={100}
              max={240}
              step={10}
              unit="px"
              onChange={(topWidth) => onChange({ ...state, topWidth })}
            />
          )}

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            {state.type !== 'rectangle' && (
              <Checkbox
                label="Show altitude height (h)"
                checked={state.showAltitude}
                onChange={(showAltitude) => onChange({ ...state, showAltitude })}
              />
            )}
            <Checkbox
              label="Show congruence tick marks"
              checked={state.showCongruenceTicks}
              onChange={(showCongruenceTicks) =>
                onChange({ ...state, showCongruenceTicks })
              }
            />
            <Checkbox
              label="Show diagonal lines"
              checked={state.showDiagonals}
              onChange={(showDiagonals) => onChange({ ...state, showDiagonals })}
            />
            <Checkbox
              label="Enable textbook color accents"
              checked={state.color}
              onChange={(color) => onChange({ ...state, color })}
            />
          </div>
        </div>

        {/* Labels Control */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Side & Height Labels
          </h3>

          <LabelInput
            label="Bottom Base"
            value={state.bottomLabel}
            onChange={(bottomLabel) => onChange({ ...state, bottomLabel })}
          />
          <LabelInput
            label="Top Base"
            value={state.topLabel}
            onChange={(topLabel) => onChange({ ...state, topLabel })}
          />
          <LabelInput
            label="Left Side"
            value={state.leftLabel}
            onChange={(leftLabel) => onChange({ ...state, leftLabel })}
          />
          <LabelInput
            label="Right Side"
            value={state.rightLabel}
            onChange={(rightLabel) => onChange({ ...state, rightLabel })}
          />
          {state.showAltitude && (
            <LabelInput
              label="Altitude (h)"
              value={state.heightLabel}
              onChange={(heightLabel) => onChange({ ...state, heightLabel })}
            />
          )}
        </div>
      </div>
    </div>
  );
};
