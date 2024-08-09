"use client";

import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import { showBanner } from "./showbanner";
import { banner } from "./banner";

const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  const handleCommand = (command: string) => {
    let response = "";

    switch (command.toLowerCase()) {
      case "help":
        response =
          "Available commands: help, about, minesweeper, contact, clear, banner, secret, delete";
        break;
      case "about":
        response =
          "I am the world's next second best Web Developer. Join in me in the fight against static and boring content";
        break;
      case "minesweeper":
        response = "still programming...buffering @ 99%";
        break;
      case "contact":
        response = "akim.google@zmerlimail.com";
        break;
      case "clear":
        setOutput([]);
        return;
      case "banner":
        showBanner();

        break;
      case "secret":
        response = "Win a round of minesweeper to gain my trust";
        break;
      case "delete":
        response = "deleting your files ..... rm -rf";
        break;
      default:
        response = `Command not found: ${command}`;
    }

    setOutput([...output, `visitor@webdev4life:~$ ${command}`, response]);
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
        }}
      >
        {banner}
      </div>
      <div>type 'help' to search for commands</div>

      {/* Terminal Section */}
      <div className="overflow-auto h-full">
        {output.map((line, index) => (
          <div key={index} className="output">
            {line}
          </div>
        ))}
        <div className="input flex items-center">
          <span className="prompt">visitor@webdev4life:~$</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              className="command bg-transparent outline-none text-teal-400 pr-2"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ caretColor: "transparent" }}
            />
            <div
              className="absolute top-0 bottom-0 bg-teal-400"
              style={{
                width: "10px",
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
};

export default Terminal;
