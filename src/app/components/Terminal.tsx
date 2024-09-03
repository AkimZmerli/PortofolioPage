"use client";
import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import Banner from "../components/banner";
import Typewriter from "../components/Typewriter";
import Minesweeper from "./minesweeper";

function Terminal() {
  const [input, setInput] = useState("");
  const [showBanner, setShowBanner] = useState(true); // Start with the banner shown
  const [output, setOutput] = useState<React.ReactNode[]>([
    <p key="initial">Type 'help' to search for commands</p>,
  ]);
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
    let response: JSX.Element | string = "";

    switch (command.toLowerCase()) {
      case "help":
        response =
          "Available commands: help, about, weather, contact, clear, banner, secret, delete";
        break;
      case "about":
        response =
          "I am the world's next second best Web Developer. Join me in the fight against static and boring content.";
        break;
      case "weather":
        response = "fetching data ........ ";
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
        setShowBanner(true); // Show the banner
        return;
      case "secret":
        response = "Win a round of minesweeper to gain my trust";
        break;
      case "delete":
        response = "deleting your files ..... rm -rf";
        break;
      default:
        response = `Command not found: ${command}`;
    }

    // Use the Typewriter component for the response
    const outputWithTypewriter = (
      <Typewriter key={`response-${output.length}`} text={response} />
    );

    setOutput([
      ...output,
      <div key={`command-${output.length}`} className="text-yellow-400 py-2">
        visitor@webdev4life:~$ {command}
      </div>,
      <div key={`response-${output.length}`} className="text-teal-400 py-2">
        {outputWithTypewriter}
      </div>,
    ]);
  };

  return (
    <div
      className="bg-black text-teal-400 font-mono h-screen p-4"
      style={{
        backgroundImage: "radial-gradient(rgb(205, 25, 205) 5%, black 0)",
        backgroundSize: "40px 40px",
        minWidth: "500px",
        maxHeight: "10000px",
        overflow: "auto",
      }}
    >
      {/* Banner Section */}
      {showBanner && (
        <div
          className="mb-4"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            whiteSpace: "pre-wrap",
            lineHeight: "1.2",
            fontSize: "14px",
            overflowX: "auto",
            overflowY: "hidden",
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto",
            padding: "2rem",
          }}
        >
          <Banner />
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
