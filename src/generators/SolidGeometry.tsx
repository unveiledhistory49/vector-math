import React, { useRef } from 'react';
import type { SolidGeometryState } from '../types/figures';
import { MathText } from '../components/MathText';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { SegmentedControl } from '../components/Controls/SegmentedControl';
import { LabelInput } from '../components/Controls/LabelInput';
import { Checkbox } from '../components/Controls/Checkbox';

interface SolidGeometryProps {
  state: SolidGeometryState;
  onChange: (newState: SolidGeometryState) => void;
}

export const defaultSolidGeometryState: SolidGeometryState = {
  type: 'cylinder',
  radius: 80,
  height: 160,
  width: 140,
  depth: 60,
  showHiddenLines: true,
  showDimensionLabels: true,
  radiusLabel: { mode: 'text', text: 'r' },
  heightLabel: { mode: 'text', text: 'h' },
  slantLabel: { mode: 'text', text: 'l' },
  color: true,
};

export const SolidGeometry: React.FC<SolidGeometryProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const cx = 270;
  const cy = 200;
  const ry = state.radius * 0.35; // perspective flattening for circular bases

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas */}
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename={`solid-${state.type}`}
            onReset={() => onChange(defaultSolidGeometryState)}
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
                  .fig-line { stroke: ${state.color ? '#1e293b' : '#000000'}; stroke-width: 2.25; fill: none; }
                  .fig-dashed { stroke: #94a3b8; stroke-width: 1.75; stroke-dasharray: 4,4; fill: none; }
                  .fig-dim { stroke: #dc2626; stroke-width: 1.5; stroke-dasharray: 3,3; }
                `}</style>
              </defs>

              {/* 1. CYLINDER */}
              {state.type === 'cylinder' && (() => {
                const topY = cy - state.height / 2;
                const bottomY = cy + state.height / 2;
                const r = state.radius;

                return (
                  <g>
                    {/* Bottom base back half (dashed) */}
                    {state.showHiddenLines && (
                      <path
                        d={`M ${cx - r} ${bottomY} A ${r} ${ry} 0 0 1 ${cx + r} ${bottomY}`}
                        className="fig-dashed"
                      />
                    )}
                    {/* Bottom base front half (solid) */}
                    <path
                      d={`M ${cx - r} ${bottomY} A ${r} ${ry} 0 0 0 ${cx + r} ${bottomY}`}
                      className="fig-line"
                    />

                    {/* Side vertical boundary walls */}
                    <line x1={cx - r} y1={topY} x2={cx - r} y2={bottomY} className="fig-line" />
                    <line x1={cx + r} y1={topY} x2={cx + r} y2={bottomY} className="fig-line" />

                    {/* Top base full ellipse */}
                    <ellipse
                      cx={cx}
                      cy={topY}
                      rx={r}
                      ry={ry}
                      className="fig-line"
                      fill={state.color ? '#f8fafc' : '#ffffff'}
                    />

                    {/* Radius marker on top */}
                    {state.showDimensionLabels && (
                      <g>
                        <line x1={cx} y1={topY} x2={cx + r} y2={topY} className="fig-dim" />
                        <circle cx={cx} cy={topY} r="3" fill="#dc2626" />
                        <MathText
                          x={cx + r / 2}
                          y={topY - 10}
                          label={state.radiusLabel}
                          fontSize={18}
                          color="#dc2626"
                        />
                      </g>
                    )}

                    {/* Height marker on side */}
                    {state.showDimensionLabels && (
                      <g>
                        <line
                          x1={cx + r + 30}
                          y1={topY}
                          x2={cx + r + 30}
                          y2={bottomY}
                          stroke="#2563eb"
                          strokeWidth="1.5"
                        />
                        {/* Extension ticks */}
                        <line x1={cx + r + 20} y1={topY} x2={cx + r + 40} y2={topY} stroke="#2563eb" strokeWidth="1.5" />
                        <line x1={cx + r + 20} y1={bottomY} x2={cx + r + 40} y2={bottomY} stroke="#2563eb" strokeWidth="1.5" />
                        <MathText
                          x={cx + r + 50}
                          y={(topY + bottomY) / 2}
                          label={state.heightLabel}
                          fontSize={18}
                          color="#2563eb"
                        />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 2. CONE */}
              {state.type === 'cone' && (() => {
                const apexY = cy - state.height / 2;
                const baseCy = cy + state.height / 2;
                const r = state.radius;

                return (
                  <g>
                    {/* Back base arc (dashed) */}
                    {state.showHiddenLines && (
                      <path
                        d={`M ${cx - r} ${baseCy} A ${r} ${ry} 0 0 1 ${cx + r} ${baseCy}`}
                        className="fig-dashed"
                      />
                    )}
                    {/* Front base arc (solid) */}
                    <path
                      d={`M ${cx - r} ${baseCy} A ${r} ${ry} 0 0 0 ${cx + r} ${baseCy}`}
                      className="fig-line"
                    />

                    {/* Slanted cone sides */}
                    <line x1={cx} y1={apexY} x2={cx - r} y2={baseCy} className="fig-line" />
                    <line x1={cx} y1={apexY} x2={cx + r} y2={baseCy} className="fig-line" />

                    {/* Center altitude line */}
                    <line x1={cx} y1={apexY} x2={cx} y2={baseCy} className="fig-dashed" />
                    {/* Right angle at base center */}
                    <path
                      d={`M ${cx + 12} ${baseCy} L ${cx + 12} ${baseCy - 12} L ${cx} ${baseCy - 12}`}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                    />

                    {/* Base radius */}
                    {state.showDimensionLabels && (
                      <g>
                        <line x1={cx} y1={baseCy} x2={cx + r} y2={baseCy} className="fig-dim" />
                        <circle cx={cx} cy={baseCy} r="3" fill="#dc2626" />
                        <MathText
                          x={cx + r / 2}
                          y={baseCy + 18}
                          label={state.radiusLabel}
                          fontSize={18}
                          color="#dc2626"
                        />
                        <MathText
                          x={cx - 16}
                          y={(apexY + baseCy) / 2}
                          label={state.heightLabel}
                          fontSize={18}
                          color="#2563eb"
                        />
                        <MathText
                          x={(cx + (cx + r)) / 2 + 18}
                          y={(apexY + baseCy) / 2 - 4}
                          label={state.slantLabel}
                          fontSize={18}
                        />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 3. SPHERE */}
              {state.type === 'sphere' && (() => {
                const r = state.radius;

                return (
                  <g>
                    {/* Outer circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      className="fig-line"
                      fill={state.color ? '#f8fafc' : '#ffffff'}
                    />

                    {/* Equator back arc (dashed) */}
                    {state.showHiddenLines && (
                      <path
                        d={`M ${cx - r} ${cy} A ${r} ${ry} 0 0 1 ${cx + r} ${cy}`}
                        className="fig-dashed"
                      />
                    )}
                    {/* Equator front arc (solid) */}
                    <path
                      d={`M ${cx - r} ${cy} A ${r} ${ry} 0 0 0 ${cx + r} ${cy}`}
                      className="fig-line"
                    />

                    {/* Center point and radius */}
                    {state.showDimensionLabels && (
                      <g>
                        <circle cx={cx} cy={cy} r="3.5" fill="#dc2626" />
                        <line x1={cx} y1={cy} x2={cx + r} y2={cy} className="fig-dim" />
                        <MathText
                          x={cx + r / 2}
                          y={cy - 12}
                          label={state.radiusLabel}
                          fontSize={19}
                          color="#dc2626"
                        />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 4. RECTANGULAR PRISM */}
              {state.type === 'prism' && (() => {
                const w = state.width;
                const h = state.height;
                const d = state.depth;
                const ox = cx - w / 2 - d / 2;
                const oy = cy + h / 2;

                return (
                  <g>
                    {/* Front face */}
                    <polygon
                      points={`${ox},${oy} ${ox + w},${oy} ${ox + w},${oy - h} ${ox},${oy - h}`}
                      className="fig-line"
                      fill={state.color ? '#f8fafc' : '#ffffff'}
                    />
                    {/* Top face */}
                    <polygon
                      points={`${ox},${oy - h} ${ox + w},${oy - h} ${ox + w + d},${oy - h - d * 0.7} ${ox + d},${oy - h - d * 0.7}`}
                      className="fig-line"
                    />
                    {/* Right face */}
                    <polygon
                      points={`${ox + w},${oy} ${ox + w + d},${oy - d * 0.7} ${ox + w + d},${oy - h - d * 0.7} ${ox + w},${oy - h}`}
                      className="fig-line"
                    />

                    {/* Back hidden edges */}
                    {state.showHiddenLines && (
                      <g className="fig-dashed">
                        <line x1={ox} y1={oy} x2={ox + d} y2={oy - d * 0.7} />
                        <line x1={ox + d} y1={oy - d * 0.7} x2={ox + w + d} y2={oy - d * 0.7} />
                        <line x1={ox + d} y1={oy - d * 0.7} x2={ox + d} y2={oy - h - d * 0.7} />
                      </g>
                    )}

                    {/* Dimensions */}
                    {state.showDimensionLabels && (
                      <g>
                        <MathText x={ox + w / 2} y={oy + 22} label={state.radiusLabel} fontSize={18} />
                        <MathText x={ox - 18} y={oy - h / 2} label={state.heightLabel} fontSize={18} color="#2563eb" />
                        <MathText x={ox + w + d / 2 + 16} y={oy - d * 0.35 + 14} label={state.slantLabel} fontSize={18} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* 5. PYRAMID */}
              {state.type === 'pyramid' && (() => {
                const w = state.width;
                const h = state.height;
                const d = state.depth;
                const ox = cx - w / 2;
                const oy = cy + h / 2;
                const apexY = cy - h / 2;

                return (
                  <g>
                    {/* Front base edge */}
                    <line x1={ox} y1={oy} x2={ox + w} y2={oy} className="fig-line" />
                    {/* Right base edge */}
                    <line x1={ox + w} y1={oy} x2={ox + w + d} y2={oy - d * 0.6} className="fig-line" />

                    {/* Hidden base back edges */}
                    {state.showHiddenLines && (
                      <g className="fig-dashed">
                        <line x1={ox} y1={oy} x2={ox + d} y2={oy - d * 0.6} />
                        <line x1={ox + d} y1={oy - d * 0.6} x2={ox + w + d} y2={oy - d * 0.6} />
                        <line x1={cx} y1={apexY} x2={ox + d} y2={oy - d * 0.6} />
                      </g>
                    )}

                    {/* Front edges to apex */}
                    <line x1={cx} y1={apexY} x2={ox} y2={oy} className="fig-line" />
                    <line x1={cx} y1={apexY} x2={ox + w} y2={oy} className="fig-line" />
                    <line x1={cx} y1={apexY} x2={ox + w + d} y2={oy - d * 0.6} className="fig-line" />

                    {/* Central altitude */}
                    <line x1={cx} y1={apexY} x2={cx} y2={oy - d * 0.3} className="fig-dashed" stroke="#2563eb" />
                    <MathText x={cx - 16} y={cy} label={state.heightLabel} fontSize={18} color="#2563eb" />
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Solid Type & Parameters
          </h3>

          <SegmentedControl<SolidGeometryState['type']>
            label="Geometry"
            value={state.type}
            options={[
              { value: 'cylinder', label: 'Cylinder' },
              { value: 'cone', label: 'Cone' },
              { value: 'sphere', label: 'Sphere' },
              { value: 'prism', label: 'Prism' },
              { value: 'pyramid', label: 'Pyramid' },
            ]}
            onChange={(type) => onChange({ ...state, type })}
          />

          {(state.type === 'cylinder' || state.type === 'cone' || state.type === 'sphere') && (
            <Slider
              label="Radius (r)"
              value={state.radius}
              min={50}
              max={110}
              step={5}
              unit="px"
              onChange={(radius) => onChange({ ...state, radius })}
            />
          )}

          {state.type !== 'sphere' && (
            <Slider
              label="Height (h)"
              value={state.height}
              min={100}
              max={220}
              step={10}
              unit="px"
              onChange={(height) => onChange({ ...state, height })}
            />
          )}

          {(state.type === 'prism' || state.type === 'pyramid') && (
            <Slider
              label="Base Width (w)"
              value={state.width}
              min={100}
              max={200}
              step={10}
              unit="px"
              onChange={(width) => onChange({ ...state, width })}
            />
          )}

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Show dashed hidden back lines"
              checked={state.showHiddenLines}
              onChange={(showHiddenLines) =>
                onChange({ ...state, showHiddenLines })
              }
            />
            <Checkbox
              label="Show dimension callouts"
              checked={state.showDimensionLabels}
              onChange={(showDimensionLabels) =>
                onChange({ ...state, showDimensionLabels })
              }
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
            Measurement Labels
          </h3>

          <LabelInput
            label={state.type === 'prism' ? 'Width Label' : 'Radius (r)'}
            value={state.radiusLabel}
            onChange={(radiusLabel) => onChange({ ...state, radiusLabel })}
          />
          {state.type !== 'sphere' && (
            <LabelInput
              label="Height (h)"
              value={state.heightLabel}
              onChange={(heightLabel) => onChange({ ...state, heightLabel })}
            />
          )}
          {(state.type === 'cone' || state.type === 'prism') && (
            <LabelInput
              label="Slant / Depth Label"
              value={state.slantLabel}
              onChange={(slantLabel) => onChange({ ...state, slantLabel })}
            />
          )}
        </div>
      </div>
    </div>
  );
};
