import { Board, Cell } from "./types";

const neighbourOffsets: { offsetX: -1 | 0 | 1; offsetY: -1 | 0 | 1 }[] = [
  { offsetX: -1, offsetY: -1 },
  { offsetX: 0, offsetY: -1 },
  { offsetX: 1, offsetY: -1 },
  { offsetX: -1, offsetY: 0 },
  { offsetX: 1, offsetY: 0 },
  { offsetX: -1, offsetY: 1 },
  { offsetX: 0, offsetY: 1 },
  { offsetX: 1, offsetY: 1 },
];

export const doGeneration = (cells: Cell[]): Cell[] => {
  const allCells = getAllCellsToCheck(cells);

  let nextGeneration = allCells.map<Cell>((cell) => {
    const isAlive = getNextCellState(allCells, cell);
    return { alive: isAlive, x: cell.x, y: cell.y };
  });

  nextGeneration = nextGeneration.filter((c) => c.alive);
  return nextGeneration;
};

const getNextCellState = (cells: Cell[], currentCell: Cell): boolean => {
  let aliveNeighboursCount = 0;

  for (const offset of neighbourOffsets) {
    const neighbourCell = findCell(
      cells,
      currentCell.x + offset.offsetX,
      currentCell.y + offset.offsetY
    );
    if (neighbourCell?.alive) aliveNeighboursCount++;
    if (!currentCell.alive && aliveNeighboursCount > 3) return false; // overpopulation (early finish optimisation)
  }

  if (
    currentCell.alive &&
    (aliveNeighboursCount === 2 || aliveNeighboursCount === 3)
  )
    return true;

  if (!currentCell.alive && aliveNeighboursCount === 3) return true;

  return false;
};

const getAllCellsToCheck = (cells: Cell[]) => {
  const allCells = cells.reduce<Cell[]>((acc, cell) => {
    const neighbours = getNeighbours(cell);
    addCells(acc, neighbours);
    return acc;
  }, cells);

  return allCells;
};

const addCells = (destination: Cell[], soure: Cell[]) => {
  soure.forEach((a2) => {
    const match = destination.find((a1) => a1.x === a2.x && a1.y === a2.y);
    if (!match) destination.push(a2);
  });
};

const getNeighbours = (cell: Cell) => {
  const neighbours: Cell[] = [];
  for (const offset of neighbourOffsets) {
    const x = cell.x + offset.offsetX;
    const y = cell.y + offset.offsetY;
    neighbours.push({ alive: false, x, y });
  }
  return neighbours;
};

export const findCell = (cells: Cell[], x: number, y: number) => {
  return cells.find((cell) => cell.y === y && cell.x === x);
};

export const generateNewBoard = (sizeX: number = 50, sizeY: number = 30) => {
  const sequenceX = Array(9)
    .fill(1)
    .map((element, index) => index);

  const sequenceY = Array(13)
    .fill(1)
    .map((element, index) => index);

  const cells = sequenceX.flatMap((indexX) =>
    sequenceY.map<Cell>((indexY) => ({
      alive: true,
      x: indexX + 5,
      y: indexY + 5,
    }))
  );

  const board: Board = {
    boundary: {
      rangeX: { lower: 0, upper: sizeX },
      rangeY: { lower: 0, upper: sizeY },
    },
    cells: cells,
  };
  return board;
};

export const copyCells = (cells: Cell[]) => {
  return cells
    .filter((cell) => cell.alive)
    .map<Cell>((cell) => ({
      alive: cell.alive,
      x: cell.x,
      y: cell.y,
    }));
};

export const getSequence = (start: number, end: number) => {
  const first = start < end ? start : end;

  const result = Array(Math.round(end - start))
    .fill(1)
    .map((element, index) => first + index);
  console.log(result);

  return result;
};
