// components/TerminalOutput.tsx
import React from "react";
interface TerminalOutputProps {
  output: React.ReactNode[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  return (
    <div>
      {output.map((line, index) => (
        <div key={index} className="output py-2">
          <div className="whitespace-pre-wrap">{line}</div>
        </div>
      ))}
    </div>
  );
};
