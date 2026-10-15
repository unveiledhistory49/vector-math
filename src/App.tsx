import React, { useState, useEffect } from 'react';
import type { GeneratorKind } from './types/figures';
import { Navbar } from './components/Navbar';
import { Catalog } from './components/Catalog';

import { Triangle, defaultTriangleState } from './generators/Triangle';
import { Quadrilateral, defaultQuadrilateralState } from './generators/Quadrilateral';
import { SolidGeometry, defaultSolidGeometryState } from './generators/SolidGeometry';
import { ParallelLines, defaultParallelLinesState } from './generators/ParallelLines';
import { CoordinateGrid, defaultCoordinateGridState } from './generators/CoordinateGrid';
import { NumberLine, defaultNumberLineState } from './generators/NumberLine';
import { BoxPlot, defaultBoxPlotState } from './generators/BoxPlot';

export const App: React.FC = () => {
  const [activeGenerator, setActiveGenerator] = useState<GeneratorKind | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const fig = params.get('figure') as GeneratorKind | null;
    return fig || null;
  });

  const [triangleState, setTriangleState] = useState(defaultTriangleState);
  const [quadState, setQuadState] = useState(defaultQuadrilateralState);
  const [solidState, setSolidState] = useState(defaultSolidGeometryState);
  const [parallelLinesState, setParallelLinesState] = useState(defaultParallelLinesState);
  const [coordGridState, setCoordGridState] = useState(defaultCoordinateGridState);
  const [numLineState, setNumLineState] = useState(defaultNumberLineState);
  const [boxPlotState, setBoxPlotState] = useState(defaultBoxPlotState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (activeGenerator) {
      params.set('figure', activeGenerator);
    } else {
      params.delete('figure');
    }
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [activeGenerator]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar
        activeGenerator={activeGenerator}
        onSelectGenerator={setActiveGenerator}
      />

      <main className="flex-1 flex flex-col">
        {activeGenerator === null ? (
          <Catalog onSelectGenerator={setActiveGenerator} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex flex-col gap-6">
            <div className="flex items-center justify-between no-print border-b border-slate-200/80 pb-3">
              <button
                type="button"
                onClick={() => setActiveGenerator(null)}
                className="text-xs font-semibold text-amber-900 hover:text-amber-950 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200/80"
              >
                <span>←</span>
                <span>Back to all figures</span>
              </button>
              <span className="text-xs font-mono text-slate-600 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 hidden sm:inline-block">
                Studio Active
              </span>
            </div>

            {activeGenerator === 'triangle' && (
              <Triangle state={triangleState} onChange={setTriangleState} />
            )}
            {activeGenerator === 'quadrilateral' && (
              <Quadrilateral state={quadState} onChange={setQuadState} />
            )}
            {activeGenerator === 'solid-geometry' && (
              <SolidGeometry state={solidState} onChange={setSolidState} />
            )}
            {activeGenerator === 'parallel-lines' && (
              <ParallelLines state={parallelLinesState} onChange={setParallelLinesState} />
            )}
            {activeGenerator === 'coordinate-grid' && (
              <CoordinateGrid state={coordGridState} onChange={setCoordGridState} />
            )}
            {activeGenerator === 'number-line' && (
              <NumberLine state={numLineState} onChange={setNumLineState} />
            )}
            {activeGenerator === 'box-plot' && (
              <BoxPlot state={boxPlotState} onChange={setBoxPlotState} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
            <span className="font-medium text-slate-700">Vector Math</span>
            <span>— Precision STEM vector diagram studio for tests and worksheets.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="https://vector-physics.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-emerald-700 transition-colors"
            >
              Vector Physics
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="https://vector-chem.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-blue-800 transition-colors"
            >
              Vector Chem
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="https://github.com/unveiledhistory49/vector-math"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
