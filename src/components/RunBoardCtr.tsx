import { Board, Boundary, Cell } from "../types";

type RunBoardCtrlProps = {
  board: Board;
};
let cellSize: number;
const boardSize = 800;
let boundary: Boundary;

export const RunBoardCtrl = ({ board }: RunBoardCtrlProps) => {
  boundary = board.boundary;

  cellSize =
    boardSize / Math.round(boundary.rangeX.upper - boundary.rangeX.lower);

  return (
    <div
      className="bg-black relative"
      style={{ width: `${boardSize}px`, height: `${boardSize}px` }}
    >
      {board.cells
        .filter((c) => c.alive)
        .map((cell, idx) => (
          <CellCtrl key={idx} cell={cell} />
        ))}
    </div>
  );
};

type CellCtrlProps = {
  cell: Cell;
};

const CellCtrl = ({ cell }: CellCtrlProps) => {
  if (cell.x < boundary.rangeX.lower || cell.x > boundary.rangeX.upper)
    return <></>;
  if (cell.y < boundary.rangeY.lower || cell.y > boundary.rangeY.upper)
    return <></>;
  return (
    <div
      className={"bg-white absolute"}
      style={{
        left: (cell.x - boundary.rangeX.lower) * cellSize,
        top: (cell.y - boundary.rangeY.lower) * cellSize,
        width: `${cellSize}px`,
        height: `${cellSize}px`,
      }}
    ></div>
  );
};
