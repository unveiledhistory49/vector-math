import React from 'react';
import type { GeneratorKind } from '../types/figures';

export const FigurePreview: React.FC<{ kind: GeneratorKind }> = ({ kind }) => {
  switch (kind) {
    case 'triangle':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Geometric triangle preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Right Triangle */}
          <polygon
            points="45,145 195,145 45,35"
            fill="#f8fafc"
            stroke="#111827"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Right-angle square */}
          <path
            d="M 45 129 L 61 129 L 61 145"
            fill="none"
            stroke="#111827"
            strokeWidth="1.5"
          />

          {/* Altitude line (dashed) */}
          <line
            x1="45"
            y1="35"
            x2="95"
            y2="145"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x="76"
            y="95"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="13"
            fontStyle="italic"
            fill="#111827"
          >
            h
          </text>

          {/* Side labels */}
          <text
            x="30"
            y="95"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="14"
            fontStyle="italic"
            fill="#111827"
          >
            a
          </text>
          <text
            x="120"
            y="162"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="14"
            fontStyle="italic"
            fill="#111827"
          >
            b
          </text>
          <text
            x="130"
            y="85"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="14"
            fontStyle="italic"
            fill="#111827"
          >
            c
          </text>

          {/* Angle arc at C */}
          <path
            d="M 165 145 A 30 30 0 0 0 174 135"
            fill="none"
            stroke="#111827"
            strokeWidth="1.5"
          />
          <text
            x="152"
            y="138"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="12"
            fontStyle="italic"
            fill="#111827"
          >
            θ
          </text>
        </svg>
      );

    case 'quadrilateral':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Quadrilateral preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Trapezoid */}
          <polygon
            points="65,45 175,45 205,145 35,145"
            fill="#f8fafc"
            stroke="#111827"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Parallel line arrows on top and bottom bases */}
          <path d="M 116 42 L 122 45 L 116 48" fill="none" stroke="#111827" strokeWidth="1.8" />
          <path d="M 116 142 L 122 145 L 116 148" fill="none" stroke="#111827" strokeWidth="1.8" />

          {/* Altitude height (dashed) */}
          <line
            x1="65"
            y1="45"
            x2="65"
            y2="145"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path d="M 65 133 L 77 133 L 77 145" fill="none" stroke="#111827" strokeWidth="1.2" />
          <text
            x="72"
            y="100"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="13"
            fontStyle="italic"
            fill="#111827"
          >
            h
          </text>

          {/* Base labels */}
          <text
            x="120"
            y="35"
            textAnchor="middle"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="13"
            fontStyle="italic"
            fill="#111827"
          >
            b<tspan dy="3" fontSize="9">1</tspan>
          </text>
          <text
            x="120"
            y="162"
            textAnchor="middle"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="13"
            fontStyle="italic"
            fill="#111827"
          >
            b<tspan dy="3" fontSize="9">2</tspan>
          </text>
        </svg>
      );

    case 'solid-geometry':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Solid geometry cylinder preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Cylinder Top Ellipse */}
          <ellipse cx="120" cy="45" rx="55" ry="18" fill="#f8fafc" stroke="#111827" strokeWidth="2.2" />

          {/* Side Walls */}
          <line x1="65" y1="45" x2="65" y2="135" stroke="#111827" strokeWidth="2.2" />
          <line x1="175" y1="45" x2="175" y2="135" stroke="#111827" strokeWidth="2.2" />

          {/* Bottom Ellipse Front (Solid) */}
          <path
            d="M 65 135 A 55 18 0 0 0 175 135"
            fill="none"
            stroke="#111827"
            strokeWidth="2.2"
          />
          {/* Bottom Ellipse Back (Dashed) */}
          <path
            d="M 65 135 A 55 18 0 0 1 175 135"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />

          {/* Radius arrow on top */}
          <line x1="120" y1="45" x2="175" y2="45" stroke="#111827" strokeWidth="1.5" />
          <circle cx="120" cy="45" r="2.5" fill="#111827" />
          <polygon points="175,45 167,42 167,48" fill="#111827" />
          <text
            x="145"
            y="40"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="12"
            fontStyle="italic"
            fill="#111827"
          >
            r
          </text>

          {/* Height label on side */}
          <line x1="190" y1="45" x2="190" y2="135" stroke="#64748b" strokeWidth="1.3" />
          <line x1="185" y1="45" x2="195" y2="45" stroke="#64748b" strokeWidth="1.3" />
          <line x1="185" y1="135" x2="195" y2="135" stroke="#64748b" strokeWidth="1.3" />
          <text
            x="202"
            y="94"
            fontFamily="'Times New Roman', Times, serif"
            fontSize="13"
            fontStyle="italic"
            fill="#111827"
          >
            h
          </text>
        </svg>
      );

    case 'parallel-lines':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Parallel lines transversal preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Line 1 */}
          <line x1="25" y1="60" x2="215" y2="60" stroke="#111827" strokeWidth="2.2" />
          <polygon points="25,60 32,56 32,64" fill="#111827" />
          <polygon points="215,60 208,56 208,64" fill="#111827" />
          {/* Parallel arrow tick */}
          <path d="M 125 57 L 131 60 L 125 63" fill="none" stroke="#111827" strokeWidth="1.8" />

          {/* Line 2 */}
          <line x1="25" y1="125" x2="215" y2="125" stroke="#111827" strokeWidth="2.2" />
          <polygon points="25,125 32,121 32,129" fill="#111827" />
          <polygon points="215,125 208,121 208,129" fill="#111827" />
          {/* Parallel arrow tick */}
          <path d="M 125 122 L 131 125 L 125 128" fill="none" stroke="#111827" strokeWidth="1.8" />

          {/* Transversal Line */}
          <line x1="60" y1="160" x2="180" y2="25" stroke="#111827" strokeWidth="2.2" />
          <polygon points="60,160 63,151 70,157" fill="#111827" />
          <polygon points="180,25 177,34 170,28" fill="#111827" />

          {/* Alternate Interior Angles arcs */}
          <path
            d="M 134 60 A 18 18 0 0 1 143 72"
            fill="none"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text
            x="138"
            y="76"
            fontFamily="Arial, sans-serif"
            fontSize="10"
            fontWeight="bold"
            fill="#d97706"
          >
            1
          </text>

          <path
            d="M 97 125 A 18 18 0 0 1 88 113"
            fill="none"
            stroke="#d97706"
            strokeWidth="2"
          />
          <text
            x="84"
            y="114"
            fontFamily="Arial, sans-serif"
            fontSize="10"
            fontWeight="bold"
            fill="#d97706"
          >
            2
          </text>
        </svg>
      );

    case 'coordinate-grid':
      return (
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Coordinate grid preview"
        >
          <rect width="240" height="180" fill="#ffffff" />
          {/* Grid lines */}
          <g stroke="#e2e8f0" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`h${i}`} x1="30" y1={20 + i * 17.5} x2="210" y2={20 + i * 17.5} />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v${i}`} x1={30 + i * 18} y1="20" x2={30 + i * 18} y2="160" />
            ))}
          </g>

          {/* Axes */}
          <line x1="30" y1="90" x2="210" y2="90" stroke="#111827" strokeWidth="2" />
          <polygon points="210,90 203,87 203,93" fill="#111827" />
          <polygon points="30,90 37,87 37,93" fill="#111827" />

          <line x1="120" y1="160" x2="120" y2="20" stroke="#111827" strokeWidth="2" />
          <polygon points="120,20 117,27 123,27" fill="#111827" />
          <polygon points="120,160 117,153 123,153" fill="#111827" />

          <text x="212" y="102" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#111827">x</text>
          <text x="126" y="24" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#111827">y</text>

          {/* Plotted Line y = 0.5x + 1 */}
          <line x1="48" y1="125" x2="192" y2="55" stroke="#d97706" strokeWidth="2.5" />
          <circle cx="120" cy="90" r="3.5" fill="#111827" />
          <circle cx="156" cy="72.5" r="3.5" fill="#111827" />
        </svg>
      );

    case 'number-line':
      return (
        <svg
          viewBox="0 0 240 100"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Number line preview"
        >
          <rect width="240" height="100" fill="#ffffff" />
          {/* Main Axis */}
          <line x1="20" y1="50" x2="220" y2="50" stroke="#111827" strokeWidth="2" />
          <polygon points="20,50 27,47 27,53" fill="#111827" />
          <polygon points="220,50 213,47 213,53" fill="#111827" />

          {/* Ticks from -3 to +3 */}
          {[-3, -2, -1, 0, 1, 2, 3].map((val, i) => {
            const x = 40 + i * 26.6;
            return (
              <g key={val}>
                <line x1={x} y1="44" x2={x} y2="56" stroke="#111827" strokeWidth="1.5" />
                <text
                  x={x}
                  y="70"
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize="11"
                  fill="#475569"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Shaded Interval: -1 < x <= 2 */}
          <line x1="93.2" y1="50" x2="173" y2="50" stroke="#d97706" strokeWidth="4" />
          {/* Open circle at -1 */}
          <circle cx="93.2" cy="50" r="4.5" fill="#ffffff" stroke="#d97706" strokeWidth="2.5" />
          {/* Closed circle at 2 */}
          <circle cx="173" cy="50" r="4.5" fill="#d97706" stroke="#d97706" strokeWidth="1" />
        </svg>
      );

    case 'box-plot':
      return (
        <svg
          viewBox="0 0 240 140"
          className="w-full h-full object-contain select-none"
          role="img"
          aria-label="Box plot preview"
        >
          <rect width="240" height="140" fill="#ffffff" />
          {/* Calibrated axis at bottom */}
          <line x1="30" y1="105" x2="210" y2="105" stroke="#111827" strokeWidth="1.8" />
          {[10, 20, 30, 40, 50].map((v, i) => {
            const x = 40 + i * 40;
            return (
              <g key={v}>
                <line x1={x} y1="101" x2={x} y2="109" stroke="#111827" strokeWidth="1.3" />
                <text
                  x={x}
                  y="122"
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize="10"
                  fill="#64748b"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* Whiskers */}
          {/* Min Whisker (x=55) to Q1 (x=85) */}
          <line x1="55" y1="55" x2="85" y2="55" stroke="#111827" strokeWidth="2" />
          <line x1="55" y1="43" x2="55" y2="67" stroke="#111827" strokeWidth="2" />

          {/* Max Whisker Q3 (x=165) to Max (x=195) */}
          <line x1="165" y1="55" x2="195" y2="55" stroke="#111827" strokeWidth="2" />
          <line x1="195" y1="43" x2="195" y2="67" stroke="#111827" strokeWidth="2" />

          {/* IQR Box (Q1=85 to Q3=165) */}
          <rect
            x="85"
            y="35"
            width="80"
            height="40"
            fill="#fef3c7"
            stroke="#111827"
            strokeWidth="2.2"
          />

          {/* Median line (x=125) */}
          <line x1="125" y1="35" x2="125" y2="75" stroke="#b45309" strokeWidth="3" />
        </svg>
      );

    default:
      return null;
  }
};
