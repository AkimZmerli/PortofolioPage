"use client";
// components/Terminal.tsx
import React, { useState } from "react";
import { useCommands } from "../app/hooks/useCommandHooks";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalCursor } from "./TerminalCursor";
import { useTerminalInput } from "../app/hooks/useTerminalInput";
import Banner from "../lib/commands/banner";

interface WaitingInputState {
  prompt: string;
}

export function Terminal() {
  const [output, setOutput] = useState<React.ReactNode[]>([
    <p key="initial">Type &apos;help&apos; to search for commands</p>,
  ]);
  const [showBanner, setShowBanner] = useState(true);

  const appendOutput = React.useCallback((content: React.ReactNode) => {
    setOutput((prev) => [...prev, content]);
  }, []);

  const { executeCommand, waitingForInput, isWaitingForInput } = useCommands({
    onOutput: appendOutput,
    onClear: () => setOutput([]),
    onBanner: () => setShowBanner(true),
    onStateChange: (newState) => {
      // Handle any state changes from commands
      if ("showBanner" in newState) {
        setShowBanner(newState.showBanner);
      }
      // Add other state handling as needed
    },
  });

  const handleCommandSubmit = (command: string, args: string[]) => {
    // Add command to output
    appendOutput(
      <div key={`command-${Date.now()}`} className="text-yellow-400 py-2">
        visitor@webdev4life:~$ {command} {args.join(" ")}
      </div>
    );

    // Execute the command
    executeCommand(command, args);
  };

  const terminalInput = useTerminalInput({
    onCommand: handleCommandSubmit,
    isWaitingForInput: isWaitingForInput, // Use isWaitingForInput here
  });

  const {
    input,
    setInput,
    isFocused,
    inputRef,
    handleKeyDown,
    handleFocus,
    handleBlur,
  } = terminalInput;

  return (
    <div
      className="bg-black text-teal-400 font-mono h-screen overflow-x-hidden"
      style={{
        backgroundImage: "radial-gradient(rgb(205, 25, 205) 5%, black 0)",
        backgroundSize: "40px 40px",
        minWidth: "500px",
      }}
    >
      <div className="p-8">
        {showBanner && <Banner />}

        <TerminalOutput output={output} />

        <div className="input flex items-center my-2">
          <span className="prompt mr-2">
            {isWaitingForInput ? "> " : "visitor@webdev4life:~$ "}
          </span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              className="command bg-transparent outline-none text-teal-400 w-full"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ caretColor: "transparent" }}
            />
            <TerminalCursor isFocused={isFocused} inputLength={input.length} />
          </div>
        </div>

        {(waitingForInput as WaitingInputState)?.prompt && (
          <div className="text-yellow-400 mt-2">
            {(waitingForInput as WaitingInputState).prompt}
          </div>
        )}
      </div>
    </div>
  );
}
{
  /*
  ToDo: 

  link to github and linkedIn
  autofocus on input
  */
}
