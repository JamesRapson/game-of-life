export type Cell = {
  x: number;
  y: number;
  alive: boolean;
};

export type Range = {
  lower: number;
  upper: number;
};

export type Boundary = {
  rangeX: Range;
  rangeY: Range;
};

export type Board = {
  boundary: Boundary;
  cells: Cell[];
  isRunning?: boolean;
};
