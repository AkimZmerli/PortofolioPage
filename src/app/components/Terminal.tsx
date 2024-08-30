"use client";
import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import Banner from "../components/banner";
import renderBanner from "../components/renderbanner";
import Typewriter from "../components/Typewriter";
import Minesweeper from "./minesweeper";

function Terminal() {
  const [input, setInput] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const [output, setOutput] = useState<React.ReactNode[]>([
    <p>Type 'help' to search for commands</p>,
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowBanner(true);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  const handleCommand = (command: string) => {
    let response: JSX.Element | string = "";

    switch (command.toLowerCase()) {
      case "help":
        response =
          "Available commands: help, about, minesweeper, contact, clear, banner, secret, delete";
        break;
      case "about":
        response =
          "I am the world's next second best Web Developer. Join me in the fight against static and boring content.";
        break;
      case "minesweeper":
        response = <Minesweeper />;
        break;
      case "contact":
        response = "akim.google@zmerlimail.com";
        break;
      case "clear":
        setOutput([]); // Clears all output
        setShowBanner(false); // Hide the banner
        setInput(""); // Optionally clear the input field
        return;
      case "banner":
        const banner = <pre>{/* Your ASCII banner here */}</pre>;
        renderBanner({ setOutput, banner, setShowBanner });
        break;
      case "weather":
        response = "no response yet";
        break;
      case "delete":
        response = "deleting your files ..... rm -rf";
        break;
      default:
        response = `Command not found: ${command}`;
    }

    // Use the Typewriter component for the response if response is not empty
    const outputWithTypewriter = response ? (
      <Typewriter key={`response-${output.length}`} text={response} />
    ) : null;

    // Filter out any undefined values
    const newOutput = [
      ...output,
      <div key={`command-${output.length}`} className="text-teal-400 py-2">
        visitor@webdev4life:~$ {command}
      </div>,
      outputWithTypewriter,
    ].filter(Boolean); // This filters out null and undefined values

    setOutput(newOutput);
  };

  return (
    <div
      className="bg-black text-teal-400 font-mono h-screen p-4"
      style={{
        backgroundImage: "radial-gradient(rgb(205, 25, 205) 5%, black 0)",
        backgroundSize: "40px 40px",
        minWidth: "500px", // Ensure container is wide enough
        maxHeight: "10000px",
        overflow: "auto", // Allow scrolling if needed
      }}
    >
      {/* Banner Section */}
      {showBanner && (
        <div
          className="mb-4"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            whiteSpace: "pre-wrap", // Preserve whitespace and line breaks
            lineHeight: "1.2", // Adjust line height to prevent squishing
            fontSize: "14px", // Ensure font size is appropriate for readability
            overflowX: "auto", // Allow horizontal scrolling if content overflows
            overflowY: "hidden", // Prevent vertical scrolling if not needed
            width: "100%", // Ensure the container is wide enough
            maxWidth: "100%", // Prevent the container from exceeding viewport width
            margin: "0 auto", // Center the container if desired
            padding: "2rem",
          }}
        >
          {<Banner />}
        </div>
      )}

      {/* Terminal Section */}
      {!output.length && !showBanner && (
        <div className="py-4">
          {" "}
          {/* Increased padding for the initial 'help' message */}
          <p>Type 'help' to search for commands</p>
        </div>
      )}

      <div
        className="overflow-auto h-full"
        style={{
          padding: "8px 0", // Extra padding around the output container
        }}
      >
        {output.map((line, index) => (
          <div key={index} className="output py-2">
            {" "}
            {/* Padding for each output line */}
            {line}
          </div>
        ))}

        <div className="input flex items-center my-2">
          <span className="prompt mr-2">visitor@webdev4life:~$</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              className="command bg-transparent outline-none text-teal-400 mr-2"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                caretColor: "transparent",
                padding: "4px 0", // Padding inside the input
              }}
            />
            <div
              className="absolute top-0 bottom-0 bg-teal-400 p-0"
              style={{
                width: "10px",
                height: "24px",
                left: `${input.length * 10 + 1}px`,
                animation: "blinker 1s linear infinite",
              }}
            ></div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes blinker {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Terminal;
