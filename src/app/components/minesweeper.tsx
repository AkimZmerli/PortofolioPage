import React, { useState } from "react";

export function Minesweeper() {
  const generateBoard = (rows: number, cols: number, mines: number) => {
    const board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ isOpen: false, hasMine: false }))
    );

    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!board[row][col].hasMine) {
        board[row][col].hasMine = true;
        minesPlaced++;
      }
    }

    return board;
  };
  const rows = 8;
  const cols = 8;
  const mines = 10;
  const [board, setBoard] = useState(generateBoard(rows, cols, mines));

  const handleClick = (rowIndex: number, colIndex: number) => {
    const newBoard = [...board];
    newBoard[rowIndex][colIndex].isOpen = true;
    setBoard(newBoard);
  };

  return (
    <div className="minesweeper-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="minesweeper-row">
          {row.map((cell, colIndex) => (
            <button
              key={colIndex}
              className={`minesweeper-cell ${
                cell.isOpen ? (cell.hasMine ? "mine" : "safe") : ""
              }`}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                width: "30px",
                height: "30px",
                display: "inline-block",
                backgroundColor: cell.isOpen
                  ? cell.hasMine
                    ? "red"
                    : "green"
                  : "grey",
                border: "1px solid #444",
                color: "white",
              }}
            >
              {cell.isOpen ? (cell.hasMine ? "💣" : "") : ""}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Minesweeper;
