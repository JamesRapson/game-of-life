import { useState } from "react";
import { getSequence } from "../utils";
import { Board, Cell } from "../types";

let isMouseDown: boolean = false;
let cellStyle: { width: string; height: string };
let sequenceY: number[] = [];
let sequenceX: number[] = [];
const boardSize = 800;

type EditorBoardProps = {
  board: Board;
  onCellSelected: (cell: Cell) => void;
};

export const EditorBoardCtrl = ({
  board,
  onCellSelected,
}: EditorBoardProps) => {
  sequenceY = getSequence(
    board.boundary.rangeY.lower,
    board.boundary.rangeY.upper
  );
  sequenceX = getSequence(
    board.boundary.rangeY.lower,
    board.boundary.rangeY.upper
  );

  const cellSize =
    boardSize /
    Math.round(board.boundary.rangeX.upper - board.boundary.rangeX.lower);
  cellStyle = { width: `${cellSize}px`, height: `${cellSize}px` };

  const handleMouseDown = (event: React.MouseEvent) => {
    isMouseDown = true;
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    isMouseDown = false;
  };

  return (
    <div
      onMouseDown={(event: React.MouseEvent) => handleMouseDown(event)}
      onMouseUp={(event: React.MouseEvent) => handleMouseUp(event)}
    >
      {sequenceY.map((idx) => (
        <RowCtrl
          key={idx}
          indexY={idx}
          board={board}
          onCellSelected={onCellSelected}
        />
      ))}
    </div>
  );
};

type RowCtrlProps = {
  indexY: number;
  board: Board;
  onCellSelected: (cell: Cell) => void;
};

const getCell = (cells: Cell[], indexX: number, indexY: number) => {
  let cell = cells.find((c) => c.x === indexX && c.y === indexY);
  if (!cell) cell = { alive: false, x: indexX, y: indexY };
  return cell;
};

const RowCtrl = ({ indexY, board, onCellSelected }: RowCtrlProps) => {
  return (
    <div className="flex">
      {sequenceX.map((indexX) => (
        <CellCtrl
          key={indexX}
          onCellSelected={onCellSelected}
          cell={getCell(board.cells, indexX, indexY)}
        />
      ))}
    </div>
  );
};

type CellCtrlProps = {
  cell: Cell;
  onCellSelected: (cell: Cell) => void;
};

const CellCtrl = ({ cell, onCellSelected }: CellCtrlProps) => {
  const [isAlive, setIsAlive] = useState(cell.alive);

  const handleCellSelected = () => {
    onCellSelected && cell && onCellSelected(cell);
    setIsAlive((prev) => !prev);
  };

  const handleCellFocus = () => {
    if (!isMouseDown) return;
    onCellSelected && cell && onCellSelected(cell);
    setIsAlive((prev) => !prev);
  };

  return (
    <div
      className={`flex-1 relative h-8 w-8 hover:bg-gray-400 border
      ${isAlive ? "bg-white" : "bg-black"}`}
      style={cellStyle}
      onClick={handleCellSelected}
      onMouseEnter={handleCellFocus}
    ></div>
  );
};
