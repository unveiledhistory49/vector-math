import React, { useRef } from 'react';
import type { BoxPlotState } from '../types/figures';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { Checkbox } from '../components/Controls/Checkbox';

interface BoxPlotProps {
  state: BoxPlotState;
  onChange: (newState: BoxPlotState) => void;
}

export const defaultBoxPlotState: BoxPlotState = {
  minVal: 12,
  q1: 24,
  median: 38,
  q3: 52,
  maxVal: 68,
  axisMin: 0,
  axisMax: 80,
  showValues: true,
  color: true,
};

export const BoxPlot: React.FC<BoxPlotProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 520;
  const height = 220;
  const paddingX = 50;

  const boxCenterY = 80;
  const boxHeight = 50;
  const boxTop = boxCenterY - boxHeight / 2;
  const boxBottom = boxCenterY + boxHeight / 2;

  const axisY = 160;

  const plotWidth = width - 2 * paddingX;
  const span = state.axisMax - state.axisMin;

  const toPxX = (v: number) => paddingX + ((v - state.axisMin) / span) * plotWidth;

  // Generate tick steps
  const step = 10;
  const ticks: number[] = [];
  for (let v = state.axisMin; v <= state.axisMax; v += step) {
    ticks.push(v);
  }

  const pxMin = toPxX(state.minVal);
  const pxQ1 = toPxX(state.q1);
  const pxMed = toPxX(state.median);
  const pxQ3 = toPxX(state.q3);
  const pxMax = toPxX(state.maxVal);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas */}
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename="box-plot"
            onReset={() => onChange(defaultBoxPlotState)}
          />

          <div className="w-full flex justify-center py-6 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[520px] h-auto select-none"
              style={{ maxHeight: '240px' }}
            >
              {/* Axis Line */}
              <line
                x1={paddingX - 15}
                y1={axisY}
                x2={width - paddingX + 15}
                y2={axisY}
                stroke="#1e293b"
                strokeWidth="2"
              />

              {/* Axis Ticks & Numbers */}
              {ticks.map((t) => {
                const px = toPxX(t);
                return (
                  <g key={t}>
                    <line
                      x1={px}
                      y1={axisY - 5}
                      x2={px}
                      y2={axisY + 5}
                      stroke="#1e293b"
                      strokeWidth="1.5"
                    />
                    <text
                      x={px}
                      y={axisY + 22}
                      textAnchor="middle"
                      fontSize="13"
                      fontFamily="sans-serif"
                      fill="#475569"
                    >
                      {t}
                    </text>
                  </g>
                );
              })}

              {/* Left Whisker (Min to Q1) */}
              <line
                x1={pxMin}
                y1={boxCenterY}
                x2={pxQ1}
                y2={boxCenterY}
                stroke="#1e293b"
                strokeWidth="2.5"
              />
              {/* Min Cap */}
              <line
                x1={pxMin}
                y1={boxCenterY - 16}
                x2={pxMin}
                y2={boxCenterY + 16}
                stroke="#1e293b"
                strokeWidth="2.5"
              />

              {/* Right Whisker (Q3 to Max) */}
              <line
                x1={pxQ3}
                y1={boxCenterY}
                x2={pxMax}
                y2={boxCenterY}
                stroke="#1e293b"
                strokeWidth="2.5"
              />
              {/* Max Cap */}
              <line
                x1={pxMax}
                y1={boxCenterY - 16}
                x2={pxMax}
                y2={boxCenterY + 16}
                stroke="#1e293b"
                strokeWidth="2.5"
              />

              {/* IQR Box (Q1 to Q3) */}
              <rect
                x={pxQ1}
                y={boxTop}
                width={Math.max(1, pxQ3 - pxQ1)}
                height={boxHeight}
                fill={state.color ? '#eff6ff' : '#ffffff'}
                stroke="#1e293b"
                strokeWidth="2.5"
              />

              {/* Median Line */}
              <line
                x1={pxMed}
                y1={boxTop}
                x2={pxMed}
                y2={boxBottom}
                stroke={state.color ? '#dc2626' : '#1e293b'}
                strokeWidth="3"
              />

              {/* Floating Value Labels Above */}
              {state.showValues && (
                <g fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                  {/* Min */}
                  <text x={pxMin} y={boxTop - 18} fill="#64748b">
                    Min={state.minVal}
                  </text>
                  {/* Q1 */}
                  <text x={pxQ1} y={boxTop - 8} fill="#2563eb">
                    Q₁={state.q1}
                  </text>
                  {/* Median */}
                  <text x={pxMed} y={boxTop - 22} fill="#dc2626">
                    Med={state.median}
                  </text>
                  {/* Q3 */}
                  <text x={pxQ3} y={boxTop - 8} fill="#2563eb">
                    Q₃={state.q3}
                  </text>
                  {/* Max */}
                  <text x={pxMax} y={boxTop - 18} fill="#64748b">
                    Max={state.maxVal}
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-5 no-print">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
          <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Five-Number Summary
          </h3>

          <Slider
            label="Minimum (Min)"
            value={state.minVal}
            min={0}
            max={state.q1 - 1}
            step={1}
            unit=""
            onChange={(minVal) => onChange({ ...state, minVal })}
          />

          <Slider
            label="First Quartile (Q₁)"
            value={state.q1}
            min={state.minVal + 1}
            max={state.median - 1}
            step={1}
            unit=""
            onChange={(q1) => onChange({ ...state, q1 })}
          />

          <Slider
            label="Median"
            value={state.median}
            min={state.q1 + 1}
            max={state.q3 - 1}
            step={1}
            unit=""
            onChange={(median) => onChange({ ...state, median })}
          />

          <Slider
            label="Third Quartile (Q₃)"
            value={state.q3}
            min={state.median + 1}
            max={state.maxVal - 1}
            step={1}
            unit=""
            onChange={(q3) => onChange({ ...state, q3 })}
          />

          <Slider
            label="Maximum (Max)"
            value={state.maxVal}
            min={state.q3 + 1}
            max={80}
            step={1}
            unit=""
            onChange={(maxVal) => onChange({ ...state, maxVal })}
          />

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Checkbox
              label="Show summary statistics annotations"
              checked={state.showValues}
              onChange={(showValues) => onChange({ ...state, showValues })}
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
