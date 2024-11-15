import { useState } from "react";
import Typewriter from "../Typewriter";

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
