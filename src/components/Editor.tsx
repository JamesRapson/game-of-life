import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faPlay,
  faPause,
  faUndo,
  faPlus,
  faMinus,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";

import * as React from "react";
import { useState } from "react";
import { doGeneration } from "../runner";
import { Board, Cell, Range } from "../types";
import { Button } from "./Button";
import { EditorBoardCtrl } from "./EditorBoardCtrl";
import { RunBoardCtrl } from "./RunBoardCtr";
import { copyCells, scaleRange } from "../utils";

type EditorProps = {
  board: Board;
};

let initialCells: Cell[];

export const Editor = ({ board }: EditorProps) => {
  const [generationCount, setGenerationCount] = useState(0);
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (!board.isRunning) return;
    const interval = setInterval(() => {
      board.cells = doGeneration(board.cells);
      setGenerationCount((prev) => prev + 1);
    }, 300);
    return () => clearInterval(interval);
  }, [board.isRunning]);

  const handleCellSelected = (cell: Cell) => {
    cell.alive = !cell.alive;
    const listCell = board.cells.find((c) => c.x === cell.x && c.y === cell.y);
    if (!listCell) board.cells.push(cell);
  };

  const handleStartButtonClick = () => {
    initialCells = copyCells(board.cells);
    board.isRunning = true;
    setCount((prev) => prev + 1);
  };

  const handlePauseButtonClick = () => {
    board.isRunning = false;
    setCount((prev) => prev + 1);
  };

  const handleResetButtonClick = () => {
    setGenerationCount(0);
    board.cells = copyCells(initialCells);
  };

  const handleStepForward = () => {
    if (board.isRunning) return;
    board.cells = doGeneration(board.cells);
    setGenerationCount((prev) => prev + 1);
  };

  const handleIncreaseSize = () => {
    board.boundary.rangeX = scaleRange(1.1, board.boundary.rangeX);
    board.boundary.rangeY = scaleRange(1.1, board.boundary.rangeY);
    setCount((prev) => prev + 1);
  };

  const handleDecreaseSize = () => {
    board.boundary.rangeX = scaleRange(0.9, board.boundary.rangeX);
    board.boundary.rangeY = scaleRange(0.9, board.boundary.rangeY);
    setCount((prev) => prev + 1);
  };

  const handleClear = () => {
    board.cells = [];
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <h1 className="text-4xl">Game of Life</h1>
      <div className="">
        <div className="flex">
          <div className="px-1">
            Size X : {board.boundary.rangeX.upper - board.boundary.rangeX.lower}
          </div>
          <div className="px-1">
            Size Y : {board.boundary.rangeY.upper - board.boundary.rangeY.lower}
          </div>
          <div className="px-1">
            Status : {board.isRunning ? "Running" : "Paused"}
          </div>
          <div className="px-1">Generation Count : {generationCount}</div>
        </div>
        <div className="flex">
          <div key={generationCount + count} className="w-min">
            {board.isRunning ? (
              <RunBoardCtrl board={board} />
            ) : (
              <EditorBoardCtrl
                board={board}
                onCellSelected={handleCellSelected}
              />
            )}
          </div>

          <div className="py-2">
            <Button
              label="Start"
              onClick={handleStartButtonClick}
              disabled={board.isRunning}
            >
              <FontAwesomeIcon icon={faPlay} size="2x" className="pr-2" />
            </Button>
            <Button
              label="Pause"
              onClick={handlePauseButtonClick}
              disabled={!board.isRunning}
            >
              <FontAwesomeIcon icon={faPause} size="2x" className="pr-2" />
            </Button>
            <Button
              label="Reset"
              onClick={handleResetButtonClick}
              disabled={board.isRunning}
            >
              <FontAwesomeIcon icon={faUndo} size="2x" className="pr-2" />
            </Button>
            <Button
              label="Step Forwards"
              onClick={handleStepForward}
              disabled={board.isRunning}
            >
              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                size="2x"
                className="pr-2"
              />
            </Button>
            <Button
              label="Clear"
              onClick={handleClear}
              disabled={board.isRunning}
            >
              <FontAwesomeIcon
                icon={faMinusCircle}
                size="2x"
                className="pr-2"
              />
            </Button>
            <div className="flex">
              <Button onClick={handleIncreaseSize}>
                <FontAwesomeIcon icon={faPlus} size="2x" className="" />
              </Button>
              <Button onClick={handleDecreaseSize}>
                <FontAwesomeIcon icon={faMinus} size="2x" className="" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
