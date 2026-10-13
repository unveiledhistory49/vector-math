import React, { useRef } from 'react';
import type { CoordinateGridState } from '../types/figures';
import { MathText } from '../components/MathText';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { SegmentedControl } from '../components/Controls/SegmentedControl';
import { Checkbox } from '../components/Controls/Checkbox';

interface CoordinateGridProps {
  state: CoordinateGridState;
  onChange: (newState: CoordinateGridState) => void;
}

export const defaultCoordinateGridState: CoordinateGridState = {
  xMin: -6,
  xMax: 6,
  yMin: -6,
  yMax: 6,
  plotType: 'slope-triangle',
  slope: 1.5,
  yIntercept: -1,
  showSlopeTriangle: true,
  points: [
    { x: 0, y: -1, label: '(0, -1)' },
    { x: 2, y: 2, label: '(2, 2)' },
  ],
  showGrid: true,
  showTicks: true,
  color: true,
};

export const CoordinateGrid: React.FC<CoordinateGridProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Pixel dimensions
  const width = 480;
  const height = 480;
  const padding = 40;

  const plotWidth = width - 2 * padding;
  const plotHeight = height - 2 * padding;

  // Coordinate transforms
  const xSpan = state.xMax - state.xMin;
  const ySpan = state.yMax - state.yMin;

  const toPxX = (mathX: number) => padding + ((mathX - state.xMin) / xSpan) * plotWidth;
  const toPxY = (mathY: number) => padding + ((state.yMax - mathY) / ySpan) * plotHeight;

  // Origin in pixel coordinates
  const originPxX = toPxX(0);
  const originPxY = toPxY(0);

  // Line points for y = mx + b
  const p1x = state.xMin;
  const p1y = state.slope * p1x + state.yIntercept;
  const p2x = state.xMax;
  const p2y = state.slope * p2x + state.yIntercept;

  // Slope triangle points: from (x1, y1) to (x2, y1) to (x2, y2)
  const stX1 = 0;
  const stY1 = state.yIntercept;
  const stX2 = 2;
  const stY2 = state.slope * stX2 + state.yIntercept;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas */}
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename="coordinate-grid"
            onReset={() => onChange(defaultCoordinateGridState)}
          />

          <div className="w-full flex justify-center py-4 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[480px] h-auto select-none"
              style={{ maxHeight: '480px' }}
            >
              <defs>
                <marker
                  id="axis-arrow"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
                </marker>
              </defs>

              {/* Grid Lines */}
              {state.showGrid && (
                <g stroke="#e2e8f0" strokeWidth="1">
                  {/* Vertical grid lines */}
                  {Array.from({ length: xSpan + 1 }, (_, i) => state.xMin + i).map((xVal) => (
                    <line
                      key={`vx-${xVal}`}
                      x1={toPxX(xVal)}
                      y1={padding}
                      x2={toPxX(xVal)}
                      y2={height - padding}
                    />
                  ))}
                  {/* Horizontal grid lines */}
                  {Array.from({ length: ySpan + 1 }, (_, i) => state.yMin + i).map((yVal) => (
                    <line
                      key={`hy-${yVal}`}
                      x1={padding}
                      y1={toPxY(yVal)}
                      x2={width - padding}
                      y2={toPxY(yVal)}
                    />
                  ))}
                </g>
              )}

              {/* Main Axes */}
              {/* X Axis */}
              <line
                x1={padding - 15}
                y1={originPxY}
                x2={width - padding + 15}
                y2={originPxY}
                stroke="#1e293b"
                strokeWidth="2"
                markerStart="url(#axis-arrow)"
                markerEnd="url(#axis-arrow)"
              />
              {/* Y Axis */}
              <line
                x1={originPxX}
                y1={height - padding + 15}
                x2={originPxX}
                y2={padding - 15}
                stroke="#1e293b"
                strokeWidth="2"
                markerStart="url(#axis-arrow)"
                markerEnd="url(#axis-arrow)"
              />

              {/* Axis Labels */}
              <text
                x={width - padding + 24}
                y={originPxY + 5}
                fontSize="17"
                fontFamily="'Times New Roman', serif"
                fontStyle="italic"
                fill="#1e293b"
              >
                x
              </text>
              <text
                x={originPxX}
                y={padding - 22}
                fontSize="17"
                fontFamily="'Times New Roman', serif"
                fontStyle="italic"
                textAnchor="middle"
                fill="#1e293b"
              >
                y
              </text>

              {/* Ticks and Numbers */}
              {state.showTicks && (
                <g fontSize="12" fontFamily="sans-serif" fill="#64748b" textAnchor="middle">
                  {/* X Ticks */}
                  {Array.from({ length: xSpan + 1 }, (_, i) => state.xMin + i)
                    .filter((x) => x !== 0 && x % 2 === 0)
                    .map((xVal) => (
                      <g key={`tx-${xVal}`}>
                        <line
                          x1={toPxX(xVal)}
                          y1={originPxY - 4}
                          x2={toPxX(xVal)}
                          y2={originPxY + 4}
                          stroke="#1e293b"
                          strokeWidth="1.5"
                        />
                        <text x={toPxX(xVal)} y={originPxY + 16}>
                          {xVal}
                        </text>
                      </g>
                    ))}
                  {/* Y Ticks */}
                  {Array.from({ length: ySpan + 1 }, (_, i) => state.yMin + i)
                    .filter((y) => y !== 0 && y % 2 === 0)
                    .map((yVal) => (
                      <g key={`ty-${yVal}`}>
                        <line
                          x1={originPxX - 4}
                          y1={toPxY(yVal)}
                          x2={originPxX + 4}
                          y2={toPxY(yVal)}
                          stroke="#1e293b"
                          strokeWidth="1.5"
                        />
                        <text x={originPxX - 12} y={toPxY(yVal) + 4} textAnchor="end">
                          {yVal}
                        </text>
                      </g>
                    ))}
                </g>
              )}

              {/* Slope Triangle */}
              {state.showSlopeTriangle && (
                <g>
                  {/* Horizontal run */}
                  <line
                    x1={toPxX(stX1)}
                    y1={toPxY(stY1)}
                    x2={toPxX(stX2)}
                    y2={toPxY(stY1)}
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  {/* Vertical rise */}
                  <line
                    x1={toPxX(stX2)}
                    y1={toPxY(stY1)}
                    x2={toPxX(stX2)}
                    y2={toPxY(stY2)}
                    stroke="#dc2626"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  {/* Slope labels */}
                  <text
                    x={(toPxX(stX1) + toPxX(stX2)) / 2}
                    y={toPxY(stY1) + 16}
                    fontSize="13"
                    fill="#2563eb"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Δx = {stX2 - stX1}
                  </text>
                  <text
                    x={toPxX(stX2) + 20}
                    y={(toPxY(stY1) + toPxY(stY2)) / 2}
                    fontSize="13"
                    fill="#dc2626"
                    fontWeight="bold"
                  >
                    Δy = {(stY2 - stY1).toFixed(1)}
                  </text>
                </g>
              )}

              {/* Plotted Line */}
              {(state.plotType === 'line' || state.plotType === 'slope-triangle') && (
                <line
                  x1={toPxX(p1x)}
                  y1={toPxY(p1y)}
                  x2={toPxX(p2x)}
                  y2={toPxY(p2y)}
                  stroke={state.color ? '#2563eb' : '#1e293b'}
                  strokeWidth="2.5"
                />
              )}

              {/* Points */}
              {state.points.map((pt, idx) => (
                <g key={idx}>
                  <circle
                    cx={toPxX(pt.x)}
                    cy={toPxY(pt.y)}
                    r="5"
                    fill={state.color ? '#dc2626' : '#1e293b'}
                  />
                  <MathText
                    x={toPxX(pt.x) + 12}
                    y={toPxY(pt.y) - 10}
                    label={{ mode: 'text', text: pt.label }}
                    fontSize={15}
                    color="#1e293b"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Graph & Function
          </h3>

          <SegmentedControl<CoordinateGridState['plotType']>
            label="Plot Display"
            value={state.plotType}
            options={[
              { value: 'slope-triangle', label: 'Slope Triangle' },
              { value: 'line', label: 'Linear Equation' },
              { value: 'points', label: 'Points Only' },
            ]}
            onChange={(plotType) => onChange({ ...state, plotType })}
          />

          <Slider
            label="Slope (m)"
            value={state.slope}
            min={-3}
            max={3}
            step={0.5}
            unit=""
            onChange={(slope) =>
              onChange({
                ...state,
                slope,
                points: [
                  { x: 0, y: state.yIntercept, label: `(0, ${state.yIntercept})` },
                  { x: 2, y: slope * 2 + state.yIntercept, label: `(2, ${(slope * 2 + state.yIntercept).toFixed(1)})` },
                ],
              })
            }
          />

          <Slider
            label="Y-Intercept (b)"
            value={state.yIntercept}
            min={-4}
            max={4}
            step={1}
            unit=""
            onChange={(yIntercept) =>
              onChange({
                ...state,
                yIntercept,
                points: [
                  { x: 0, y: yIntercept, label: `(0, ${yIntercept})` },
                  { x: 2, y: state.slope * 2 + yIntercept, label: `(2, ${(state.slope * 2 + yIntercept).toFixed(1)})` },
                ],
              })
            }
          />

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Show Δy/Δx slope triangle"
              checked={state.showSlopeTriangle}
              onChange={(showSlopeTriangle) =>
                onChange({ ...state, showSlopeTriangle })
              }
            />
            <Checkbox
              label="Show grid lines"
              checked={state.showGrid}
              onChange={(showGrid) => onChange({ ...state, showGrid })}
            />
            <Checkbox
              label="Show integer ticks"
              checked={state.showTicks}
              onChange={(showTicks) => onChange({ ...state, showTicks })}
            />
            <Checkbox
              label="Enable textbook color accents"
              checked={state.color}
              onChange={(color) => onChange({ ...state, color })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
