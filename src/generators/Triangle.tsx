import React, { useRef } from 'react';
import type { TriangleState } from '../types/figures';
import { MathText } from '../components/MathText';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { SegmentedControl } from '../components/Controls/SegmentedControl';
import { LabelInput } from '../components/Controls/LabelInput';
import { Checkbox } from '../components/Controls/Checkbox';
import { describeArc } from '../engine/math';

interface TriangleProps {
  state: TriangleState;
  onChange: (newState: TriangleState) => void;
}

export const defaultTriangleState: TriangleState = {
  type: 'right',
  baseWidth: 260,
  height: 180,
  offsetVertex: 0,
  showRightAngleMarker: true,
  showAltitude: false,
  sideALabel: { mode: 'text', text: 'a' },
  sideBLabel: { mode: 'text', text: 'b' },
  sideCLabel: { mode: 'text', text: 'c' },
  heightLabel: { mode: 'text', text: 'h' },
  angleALabel: { mode: 'text', text: 'θ' },
  angleBLabel: { mode: 'text', text: 'α' },
  angleCLabel: { mode: 'none', text: '' },
  color: true,
};

export const Triangle: React.FC<TriangleProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Layout origin
  const originX = 140;
  const originY = 320;

  // Vertex coordinates
  // A: bottom-left
  const ax = originX;
  const ay = originY;

  // B: bottom-right
  const bx = originX + state.baseWidth;
  const by = originY;

  // C: apex
  let cx = originX;
  let cy = originY - state.height;

  if (state.type === 'right') {
    cx = originX; // right angle at A
  } else if (state.type === 'isosceles') {
    cx = originX + state.baseWidth / 2;
  } else if (state.type === 'equilateral') {
    cx = originX + state.baseWidth / 2;
    cy = originY - (state.baseWidth * Math.sqrt(3)) / 2;
  } else {
    cx = originX + state.baseWidth * 0.4 + state.offsetVertex;
  }

  // Side midpoints
  const midAB = { x: (ax + bx) / 2, y: ay + 24 };
  const midBC = { x: (bx + cx) / 2 + 18, y: (by + cy) / 2 - 6 };
  const midCA = { x: (cx + ax) / 2 - 22, y: (cy + ay) / 2 };

  // Angle A calculation (deg)
  const angleDegA = Math.round(
    (Math.atan2(Math.abs(ay - cy), Math.abs(cx - ax || 1)) * 180) / Math.PI
  );

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas - Sticky Studio Viewport */}
      <div className="flex-1 w-full flex flex-col items-center lg:sticky lg:top-24">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename={`triangle-${state.type}`}
            dimensions={{ width: 540, height: 400 }}
            onReset={() => onChange(defaultTriangleState)}
          />

          <div className="w-full flex justify-center py-4 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 540 400"
              className="w-full max-w-[540px] h-auto select-none"
              style={{ maxHeight: '420px' }}
            >
              <defs>
                <style>{`
                  .fig-stroke { stroke: ${state.color ? '#1e293b' : '#000000'}; }
                  .fig-accent { stroke: ${state.color ? '#2563eb' : '#000000'}; stroke-width: 2; fill: none; }
                  .fig-fill { fill: ${state.color ? '#f8fafc' : '#ffffff'}; }
                `}</style>
              </defs>

              {/* Triangle Body */}
              <polygon
                points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
                className="fig-fill fig-stroke"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Right angle marker at A (for right triangle) */}
              {state.type === 'right' && state.showRightAngleMarker && (
                <path
                  d={`M ${ax + 20} ${ay} L ${ax + 20} ${ay - 20} L ${ax} ${ay - 20}`}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
              )}

              {/* Altitude line h from apex C to base AB */}
              {state.showAltitude && state.type !== 'right' && (
                <g>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx}
                    y2={ay}
                    stroke="#dc2626"
                    strokeWidth="1.75"
                    strokeDasharray="4,4"
                  />
                  {/* Right angle marker at altitude foot */}
                  <path
                    d={`M ${cx + 14} ${ay} L ${cx + 14} ${ay - 14} L ${cx} ${ay - 14}`}
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="1.5"
                  />
                  {/* Altitude label */}
                  {state.heightLabel.mode !== 'none' && (
                    <MathText
                      x={cx + 14}
                      y={(cy + ay) / 2}
                      label={state.heightLabel}
                      fontSize={18}
                      color="#dc2626"
                    />
                  )}
                </g>
              )}

              {/* Angle arc at A */}
              {state.angleALabel.mode !== 'none' && state.type !== 'right' && (
                <g>
                  <path
                    d={describeArc(ax, ay, 30, 0, angleDegA)}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="1.5"
                  />
                  <MathText
                    x={ax + 42}
                    y={ay - 12}
                    label={state.angleALabel}
                    fontSize={17}
                    color="#2563eb"
                  />
                </g>
              )}

              {/* Side Labels */}
              {state.sideALabel.mode !== 'none' && (
                <MathText
                  x={midAB.x}
                  y={midAB.y}
                  label={state.sideALabel}
                  fontSize={20}
                />
              )}
              {state.sideBLabel.mode !== 'none' && (
                <MathText
                  x={midBC.x}
                  y={midBC.y}
                  label={state.sideBLabel}
                  fontSize={20}
                />
              )}
              {state.sideCLabel.mode !== 'none' && (
                <MathText
                  x={midCA.x}
                  y={midCA.y}
                  label={state.sideCLabel}
                  fontSize={20}
                />
              )}

              {/* Vertex Points */}
              <circle cx={ax} cy={ay} r="3" fill="#1e293b" />
              <circle cx={bx} cy={by} r="3" fill="#1e293b" />
              <circle cx={cx} cy={cy} r="3" fill="#1e293b" />
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Triangle Geometry
          </h3>

          <SegmentedControl<TriangleState['type']>
            label="Triangle Type"
            value={state.type}
            options={[
              { value: 'right', label: 'Right' },
              { value: 'isosceles', label: 'Isosceles' },
              { value: 'equilateral', label: 'Equilateral' },
              { value: 'scalene', label: 'Scalene' },
            ]}
            onChange={(type) => onChange({ ...state, type })}
          />

          <Slider
            label="Base Length"
            value={state.baseWidth}
            min={140}
            max={340}
            step={10}
            unit="px"
            onChange={(baseWidth) => onChange({ ...state, baseWidth })}
          />

          {state.type !== 'equilateral' && (
            <Slider
              label="Height"
              value={state.height}
              min={80}
              max={240}
              step={10}
              unit="px"
              onChange={(height) => onChange({ ...state, height })}
            />
          )}

          {state.type === 'scalene' && (
            <Slider
              label="Apex Offset"
              value={state.offsetVertex}
              min={-60}
              max={100}
              step={5}
              unit="px"
              onChange={(offsetVertex) => onChange({ ...state, offsetVertex })}
            />
          )}

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            {state.type === 'right' && (
              <Checkbox
                label="Show 90° right angle square"
                checked={state.showRightAngleMarker}
                onChange={(showRightAngleMarker) =>
                  onChange({ ...state, showRightAngleMarker })
                }
              />
            )}
            {state.type !== 'right' && (
              <Checkbox
                label="Show altitude height line (h)"
                checked={state.showAltitude}
                onChange={(showAltitude) => onChange({ ...state, showAltitude })}
              />
            )}
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
            Labels & Measurements
          </h3>

          <LabelInput
            label="Base Side (AB)"
            value={state.sideALabel}
            onChange={(sideALabel) => onChange({ ...state, sideALabel })}
          />
          <LabelInput
            label="Right Side (BC)"
            value={state.sideBLabel}
            onChange={(sideBLabel) => onChange({ ...state, sideBLabel })}
          />
          <LabelInput
            label="Left Side (CA)"
            value={state.sideCLabel}
            onChange={(sideCLabel) => onChange({ ...state, sideCLabel })}
          />
          {state.showAltitude && (
            <LabelInput
              label="Altitude Label"
              value={state.heightLabel}
              onChange={(heightLabel) => onChange({ ...state, heightLabel })}
            />
          )}
          {state.type !== 'right' && (
            <LabelInput
              label="Angle A (θ)"
              value={state.angleALabel}
              onChange={(angleALabel) => onChange({ ...state, angleALabel })}
            />
          )}
        </div>
      </div>
    </div>
  );
};
