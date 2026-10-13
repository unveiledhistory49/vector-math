import React, { useState } from 'react';
import type { GeneratorKind, GeneratorMetadata } from '../types/figures';
import { Search, ArrowRight } from 'lucide-react';

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
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((gen) => (
          <div
            key={gen.id}
            onClick={() => onSelectGenerator(gen.id)}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group"
          >
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">
                {gen.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {gen.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {gen.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Open <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          No figures match “{search}”. Try clearing your search.
        </div>
      )}
    </div>
  );
};
