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
            <div className="flex items-center justify-between no-print border-b border-slate-200 pb-3">
              <button
                type="button"
                onClick={() => setActiveGenerator(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                ← Back to all figures
              </button>
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
    </div>
  );
};
