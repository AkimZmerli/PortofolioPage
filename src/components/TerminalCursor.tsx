// components/TerminalCursor.tsx
import React from "react";

interface TerminalCursorProps {
  isFocused: boolean;
  inputLength: number;
}

export const TerminalCursor: React.FC<TerminalCursorProps> = ({
  isFocused,
  inputLength,
}) => {
  return (
    <div
      className={` blinker absolute top-0 bottom-0 bg-teal-400 ${
        isFocused ? "blinker" : ""
      }`}
      style={{
        width: "10px",
        height: "24px",
        left: `${inputLength * 10 + 1}px`,
        animationName: "blinker",
        animationDuration: "1s",
        animationIterationCount: "infinite",
      }}
    />
  );
};
