import React from "react";
import styled from "styled-jsx/css";

const blinkerStyles = styled`
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  .blinker {
    animation: blinker 1s linear infinite;
  }
`;

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
      className={`absolute top-0 bottom-0 bg-teal-400 ${
        isFocused ? "blinker" : ""
      }`}
      style={{
        width: "10px",
        height: "24px",
        left: `${inputLength * 10 + 1}px`,
      }}
    >
      <style jsx>{blinkerStyles}</style>
    </div>
  );
};
