// components/TerminalOutput.tsx
import React from "react";
import Typewriter from "./Typewriter";

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

// hooks/useTerminalOutput.ts
import { useState } from "react";

export const useTerminalOutput = (initialOutput: React.ReactNode[] = []) => {
  const [output, setOutput] = useState<React.ReactNode[]>(initialOutput);

  const appendOutput = (command: string, response: React.ReactNode) => {
    setOutput((prev) => [
      ...prev,
      <div key={`command-${prev.length}`} className="text-yellow-400 py-2">
        visitor@webdev4life:~$ {command}
      </div>,
      <div key={`response-${prev.length}`} className="text-teal-400 py-2">
        <Typewriter content={response} />
      </div>,
    ]);
  };

  const clearOutput = () => setOutput([]);

  return {
    output,
    appendOutput,
    clearOutput,
  };
};
