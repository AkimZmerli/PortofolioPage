import React, { useState, useCallback } from "react";

interface Cell {
  isOpen: boolean;
  hasMine: boolean;
  neighborMines: number;
}

export const Minesweeper: React.FC = () => {
  const rows = 10;
  const cols = 10;
  const mines = 8;

  const generateBoard = useCallback((): Cell[][] => {
    const board: Cell[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isOpen: false,
        hasMine: false,
        neighborMines: 0,
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!board[row][col].hasMine) {
        board[row][col].hasMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!board[i][j].hasMine) {
          let count = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;
              if (
                ni >= 0 &&
                ni < rows &&
                nj >= 0 &&
                nj < cols &&
                board[ni][nj].hasMine
              ) {
                count++;
              }
            }
          }
          board[i][j].neighborMines = count;
        }
      }
    }

    return board;
  }, [rows, cols, mines]);

  const [board, setBoard] = useState<Cell[][]>(generateBoard);

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex].isOpen) return;

    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    newBoard[rowIndex][colIndex].isOpen = true;

    if (
      !newBoard[rowIndex][colIndex].hasMine &&
      newBoard[rowIndex][colIndex].neighborMines === 0
    ) {
      revealAdjacentCells(newBoard, rowIndex, colIndex);
    }

    setBoard(newBoard);
  };

  const revealAdjacentCells = (
    board: Cell[][],
    rowIndex: number,
    colIndex: number
  ) => {
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        const ni = rowIndex + di;
        const nj = colIndex + dj;
        if (
          ni >= 0 &&
          ni < rows &&
          nj >= 0 &&
          nj < cols &&
          !board[ni][nj].isOpen
        ) {
          board[ni][nj].isOpen = true;
          if (board[ni][nj].neighborMines === 0) {
            revealAdjacentCells(board, ni, nj);
          }
        }
      }
    }
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
              {cell.isOpen
                ? cell.hasMine
                  ? "💣"
                  : cell.neighborMines > 0
                  ? cell.neighborMines
                  : ""
                : ""}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Minesweeper;
