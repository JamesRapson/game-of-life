import React from "react";
import { Editor } from "./components/Editor";
import { generateNewBoard } from "./runner";
import { Board } from "./types";

const board: Board = generateNewBoard(20, 20);

function App() {
  return (
    <div className="px-5 py-2">
      <Editor board={board} />
    </div>
  );
}

export default App;
