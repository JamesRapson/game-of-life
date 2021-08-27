import { Cell, Range } from "./types";

export const scaleRange = (factor: number, range: Range): Range => {
  let len = Math.round(range.upper - range.lower);
  const centre = (range.upper + range.lower) / 2;
  len = Math.round(len * factor);
  let newLower = centre - len / 2;
  let newUpper = centre + len / 2;
  newLower = newLower < 0 ? Math.floor(newLower) : Math.ceil(newLower);
  newUpper = newUpper < 0 ? Math.floor(newUpper) : Math.ceil(newUpper);
  return { lower: newLower, upper: newUpper };
};

export const copyCells = (cells: Cell[]) => {
  return cells.map<Cell>((cell) => ({ ...cell }));
};

export const getSequence = (start: number, end: number) => {
  const first = start < end ? start : end;

  const result = Array(Math.round(end - start))
    .fill(1)
    .map((element, index) => first + index);
  console.log(result);

  return result;
};
