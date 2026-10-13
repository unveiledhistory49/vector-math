export type VectorNotation = 'none' | 'arrow' | 'bold';

export type LabelMode = 'text' | 'blank' | 'none';

export interface FormattedLabel {
  mode: LabelMode;
  text: string;
}

export type TriangleType = 'right' | 'isosceles' | 'equilateral' | 'scalene';

export interface TriangleState {
  type: TriangleType;
  baseWidth: number;
  height: number;
  offsetVertex: number;
  showRightAngleMarker: boolean;
  showAltitude: boolean;
  sideALabel: FormattedLabel;
  sideBLabel: FormattedLabel;
  sideCLabel: FormattedLabel;
  heightLabel: FormattedLabel;
  angleALabel: FormattedLabel;
  angleBLabel: FormattedLabel;
  angleCLabel: FormattedLabel;
  color: boolean;
}

export type QuadrilateralType = 'rectangle' | 'parallelogram' | 'trapezoid';

export interface QuadrilateralState {
  type: QuadrilateralType;
  width: number;
  height: number;
  slantOffset: number;
  topWidth: number;
  showAltitude: boolean;
  showCongruenceTicks: boolean;
  showDiagonals: boolean;
  topLabel: FormattedLabel;
  bottomLabel: FormattedLabel;
  leftLabel: FormattedLabel;
  rightLabel: FormattedLabel;
  heightLabel: FormattedLabel;
  color: boolean;
}

export type SolidGeometryType = 'prism' | 'cylinder' | 'cone' | 'sphere' | 'pyramid';

export interface SolidGeometryState {
  type: SolidGeometryType;
  radius: number;
  height: number;
  width: number;
  depth: number;
  showHiddenLines: boolean;
  showDimensionLabels: boolean;
  radiusLabel: FormattedLabel;
  heightLabel: FormattedLabel;
  slantLabel: FormattedLabel;
  color: boolean;
}

export interface ParallelLinesState {
  spacing: number;
  transversalAngle: number;
  showParallelArrows: boolean;
  angles: {
    pos: number; // 1 to 8
    label: FormattedLabel;
    showArc: boolean;
    style: 'single' | 'double';
  }[];
  color: boolean;
}

export interface CoordinateGridState {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  plotType: 'line' | 'points' | 'parabola' | 'slope-triangle';
  slope: number;
  yIntercept: number;
  showSlopeTriangle: boolean;
  points: { x: number; y: number; label: string }[];
  showGrid: boolean;
  showTicks: boolean;
  color: boolean;
}

export interface NumberLineState {
  min: number;
  max: number;
  step: number;
  leftRay?: { endpoint: number; included: boolean };
  rightRay?: { endpoint: number; included: boolean };
  segment?: { start: number; end: number; startIncluded: boolean; endIncluded: boolean };
  color: boolean;
}

export interface BoxPlotState {
  minVal: number;
  q1: number;
  median: number;
  q3: number;
  maxVal: number;
  axisMin: number;
  axisMax: number;
  showValues: boolean;
  color: boolean;
}

export type GeneratorKind =
  | 'triangle'
  | 'quadrilateral'
  | 'solid-geometry'
  | 'parallel-lines'
  | 'coordinate-grid'
  | 'number-line'
  | 'box-plot';

export interface GeneratorMetadata {
  id: GeneratorKind;
  title: string;
  description: string;
  tags: string[];
}
