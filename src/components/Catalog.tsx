import React, { useState } from 'react';
import type { GeneratorKind, GeneratorMetadata } from '../types/figures';
import { Search, ArrowRight, Compass } from 'lucide-react';

interface CatalogProps {
  onSelectGenerator: (kind: GeneratorKind) => void;
}

export const GENERATORS: GeneratorMetadata[] = [
  {
    id: 'triangle',
    title: 'Geometric Triangle Generator',
    description: 'Right, isosceles, equilateral, and scalene triangles with side lengths, angle arcs, right-angle markers, and altitudes.',
    tags: ['Geometry', 'Triangles', 'Pythagorean', 'Trigonometry'],
  },
  {
    id: 'quadrilateral',
    title: 'Quadrilateral & Polygon Generator',
    description: 'Rectangles, parallelograms, and trapezoids with altitude lines, congruence tick marks, and diagonals.',
    tags: ['Geometry', 'Area', 'Perimeter', 'Polygons'],
  },
  {
    id: 'solid-geometry',
    title: '3D Solid Geometry Generator',
    description: 'Cylinders, cones, spheres, prisms, and pyramids with dashed hidden edges, dimensions, and slant heights.',
    tags: ['Geometry', '3D Solids', 'Volume', 'Surface Area'],
  },
  {
    id: 'parallel-lines',
    title: 'Parallel Lines & Transversals',
    description: 'Two parallel lines cut by a transversal with 8 labeled angle sectors, angle arcs, and algebraic expressions.',
    tags: ['Geometry', 'Angles', 'Theorems', 'Algebra'],
  },
  {
    id: 'coordinate-grid',
    title: 'Cartesian Coordinate Grapher',
    description: 'Full Cartesian grid with integer ticks, linear equation plotting (y = mx + b), points, and slope triangles.',
    tags: ['Algebra', 'Functions', 'Slope', 'Coordinate Plane'],
  },
  {
    id: 'number-line',
    title: 'Real Number Line Inequality Grapher',
    description: 'Calibrated number line with open/closed boundary circles, ray arrows, and compound interval segments.',
    tags: ['Algebra', 'Inequalities', 'Intervals', 'Number Line'],
  },
  {
    id: 'box-plot',
    title: 'Box and Whisker Plot Generator',
    description: 'Five-number summary box plot (Min, Q1, Median, Q3, Max) with calibrated scale and summary annotations.',
    tags: ['Statistics', 'Data', 'Box Plot', 'Quartiles'],
  },
];

export const Catalog: React.FC<CatalogProps> = ({ onSelectGenerator }) => {
  const [search, setSearch] = useState('');

  const filtered = GENERATORS.filter((gen) => {
    const q = search.toLowerCase();
    return (
      gen.title.toLowerCase().includes(q) ||
      gen.description.toLowerCase().includes(q) ||
      gen.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mx-auto">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          Technical Mathematics Studio
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Math figures for your tests and worksheets
        </h1>
        <p className="text-base sm:text-lg text-slate-600">
          Make clean, publication-grade geometry, algebra, and statistics vector diagrams.
          Free, with high-DPI PNG clipboard copying and clean SVG downloads.
        </p>

        {/* Search Input */}
        <div className="mt-4 relative max-w-lg mx-auto w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search figures, e.g. “triangle”, “coordinate grid”, “box plot”..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white shadow-sm text-sm focus:outline-amber-600 focus:ring-2 focus:ring-amber-100 transition-all"
          />
        </div>
      </div>

      {/* Grid of Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filtered.map((gen) => (
          <div
            key={gen.id}
            onClick={() => onSelectGenerator(gen.id)}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                  {gen.tags[0]}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-amber-700 transition-colors">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {gen.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {gen.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-5 pt-3.5 border-t border-slate-100">
              {gen.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md font-medium border border-slate-200/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm">
            No math figures found matching "{search}". Try searching for "triangle", "grid", or "box plot".
          </div>
        )}
      </div>
    </div>
  );
};
