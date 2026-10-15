import React, { useRef, useState } from 'react';
import type { NumberLineState } from '../types/figures';
import { CanvasToolbar } from '../components/CanvasToolbar';
import { Slider } from '../components/Controls/Slider';
import { SegmentedControl } from '../components/Controls/SegmentedControl';
import { Checkbox } from '../components/Controls/Checkbox';

interface NumberLineProps {
  state: NumberLineState;
  onChange: (newState: NumberLineState) => void;
}

export const defaultNumberLineState: NumberLineState = {
  min: -5,
  max: 5,
  step: 1,
  rightRay: { endpoint: 1, included: false }, // x > 1
  color: true,
};

export const NumberLine: React.FC<NumberLineProps> = ({ state, onChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [inequalityType, setInequalityType] = useState<'ray-right' | 'ray-left' | 'segment'>('ray-right');
  const [val1, setVal1] = useState(1);
  const [val2, setVal2] = useState(4);
  const [inc1, setInc1] = useState(false);
  const [inc2, setInc2] = useState(true);

  // Dimensions
  const width = 520;
  const height = 180;
  const paddingX = 50;
  const lineY = 90;

  const plotWidth = width - 2 * paddingX;
  const span = state.max - state.min;

  const toPxX = (v: number) => paddingX + ((v - state.min) / span) * plotWidth;

  const ticks: number[] = [];
  for (let v = state.min; v <= state.max; v += state.step) {
    ticks.push(v);
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full max-w-7xl mx-auto">
      {/* Visual Canvas - Sticky Studio Viewport */}
      <div className="flex-1 w-full flex flex-col items-center lg:sticky lg:top-24">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden flex flex-col items-center">
          <CanvasToolbar
            svgRef={svgRef}
            filename="number-line"
            dimensions={{ width, height }}
            onReset={() => onChange(defaultNumberLineState)}
          />

          <div className="w-full flex justify-center py-6 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[520px] h-auto select-none"
              style={{ maxHeight: '220px' }}
            >
              <defs>
                <marker
                  id="nl-arrow-left"
                  viewBox="0 0 10 10"
                  refX="0"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill="#1e293b" />
                </marker>
                <marker
                  id="nl-arrow-right"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#1e293b" />
                </marker>

                <marker
                  id="ray-arrow-right"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={state.color ? '#d97706' : '#000000'} />
                </marker>
                <marker
                  id="ray-arrow-left"
                  viewBox="0 0 10 10"
                  refX="0"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 10 1.5 L 0 5 L 10 8.5 z" fill={state.color ? '#d97706' : '#000000'} />
                </marker>
              </defs>

              {/* Main Number Line Axis */}
              <line
                x1={paddingX - 25}
                y1={lineY}
                x2={width - paddingX + 25}
                y2={lineY}
                stroke="#1e293b"
                strokeWidth="2.5"
                markerStart="url(#nl-arrow-left)"
                markerEnd="url(#nl-arrow-right)"
              />

              {/* Tick Marks & Numbers */}
              {ticks.map((t) => {
                const px = toPxX(t);
                return (
                  <g key={t}>
                    <line
                      x1={px}
                      y1={lineY - 8}
                      x2={px}
                      y2={lineY + 8}
                      stroke="#1e293b"
                      strokeWidth="2"
                    />
                    <text
                      x={px}
                      y={lineY + 28}
                      textAnchor="middle"
                      fontSize="14"
                      fontFamily="'Times New Roman', serif"
                      fill="#1e293b"
                      fontWeight="bold"
                    >
                      {t}
                    </text>
                  </g>
                );
              })}

              {/* Inequality Overlay */}
              {inequalityType === 'ray-right' && (
                <g>
                  {/* Ray line */}
                  <line
                    x1={toPxX(val1)}
                    y1={lineY}
                    x2={width - paddingX + 20}
                    y2={lineY}
                    stroke={state.color ? '#d97706' : '#000000'}
                    strokeWidth="5"
                    markerEnd="url(#ray-arrow-right)"
                  />
                  {/* Endpoint circle */}
                  <circle
                    cx={toPxX(val1)}
                    cy={lineY}
                    r="6"
                    fill={inc1 ? (state.color ? '#d97706' : '#000000') : '#ffffff'}
                    stroke={state.color ? '#d97706' : '#000000'}
                    strokeWidth="3"
                  />
                </g>
              )}

              {inequalityType === 'ray-left' && (
                <g>
                  {/* Ray line */}
                  <line
                    x1={toPxX(val1)}
                    y1={lineY}
                    x2={paddingX - 20}
                    y2={lineY}
                    stroke={state.color ? '#d97706' : '#000000'}
                    strokeWidth="5"
                    markerEnd="url(#ray-arrow-left)"
                  />
                  {/* Endpoint circle */}
                  <circle
                    cx={toPxX(val1)}
                    cy={lineY}
                    r="6"
                    fill={inc1 ? (state.color ? '#d97706' : '#000000') : '#ffffff'}
                    stroke={state.color ? '#d97706' : '#000000'}
                    strokeWidth="3"
                  />
                </g>
              )}

              {inequalityType === 'segment' && (
                <g>
                  {/* Interval segment */}
                  <line
                    x1={toPxX(Math.min(val1, val2))}
                    y1={lineY}
                    x2={toPxX(Math.max(val1, val2))}
                    y2={lineY}
                    stroke={state.color ? '#d97706' : '#000000'}
                    strokeWidth="5"
                  />
                  {/* Left point */}
                  <circle
                    cx={toPxX(val1)}
                    cy={lineY}
                    r="6"
                    fill={inc1 ? (state.color ? '#d97706' : '#000000') : '#ffffff'}
                    stroke={state.color ? '#d97706' : '#000000'}
                    strokeWidth="3"
                  />
                  {/* Right point */}
                  <circle
                    cx={toPxX(val2)}
                    cy={lineY}
                    r="6"
                    fill={inc2 ? (state.color ? '#d97706' : '#000000') : '#ffffff'}
                    stroke={state.color ? '#d97706' : '#000000'}
                    strokeWidth="3"
                  />
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
            Inequality Configuration
          </h3>

          <SegmentedControl<'ray-right' | 'ray-left' | 'segment'>
            label="Solution Set"
            value={inequalityType}
            options={[
              { value: 'ray-right', label: 'x > a (Right)' },
              { value: 'ray-left', label: 'x < a (Left)' },
              { value: 'segment', label: 'a < x < b' },
            ]}
            onChange={(type) => setInequalityType(type)}
          />

          <Slider
            label={inequalityType === 'segment' ? 'Lower Bound (a)' : 'Boundary Point (a)'}
            value={val1}
            min={state.min}
            max={state.max}
            step={1}
            unit=""
            onChange={(v) => setVal1(v)}
          />

          <Checkbox
            label={`Include boundary point ${val1} (closed circle •)`}
            checked={inc1}
            onChange={(v) => setInc1(v)}
          />

          {inequalityType === 'segment' && (
            <>
              <Slider
                label="Upper Bound (b)"
                value={val2}
                min={state.min}
                max={state.max}
                step={1}
                unit=""
                onChange={(v) => setVal2(v)}
              />
              <Checkbox
                label={`Include upper point ${val2} (closed circle •)`}
                checked={inc2}
                onChange={(v) => setInc2(v)}
              />
            </>
          )}

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
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
