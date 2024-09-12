"use client";
import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import Banner from "../components/banner";
import Typewriter from "../components/Typewriter";
import getWeather from "./weather";
import { help } from "./help";
import { about } from "./about";
import { contact } from "./contact";
import { secret } from "./secret";
import { displayDate } from "./dispalyDate";
import { Minesweeper } from "./minesweeper";
import { EmailMe } from "./EmailMe";

function Terminal() {
  const [input, setInput] = useState("");
  const [showBanner, setShowBanner] = useState(true); // Start with the banner shown
  const [output, setOutput] = useState<React.ReactNode[]>([
    <p key="initial">Type &apos;help&apos; to search for commands</p>,
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAutoScroll = () => {
    if (bottomRef.current && inputRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        inputRef.current.parentElement!;

      // Check if the bottom is near by 100 pixels
      const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
      if (distanceToBottom <= 200) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    handleAutoScroll();
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim() === "") {
        // If the input is empty or only whitespace, do nothing
        return;
      }
      handleCommand(input);
      setInput("");
    }
  };

  const handleCommand = (command: string, args?: string[]) => {
    let response: JSX.Element | string = "";

    switch (command.toLowerCase()) {
      case "help":
        response = help();
        break;
      case "about":
        response = about();
        break;
      case "email":
        response = EmailMe();
        break;
      case "weather":
        getWeather("Leipzig").then((weatherData) => {
          setOutput((prevOutput) => [
            ...prevOutput,
            <pre key="weather">{weatherData}</pre>,
          ]);
        });
        break;

      case "contact":
        response = contact();
        break;
      case "minesweeper":
        response = <Minesweeper />;
        break;
      case "clear":
        setOutput([]);
        setShowBanner(false);
        setInput("");
        return;
      case "banner":
        setShowBanner(true);
        return;
      case "secret":
        response = secret();
        break;
      case "date":
        response = displayDate();
        break;
      default:
        response = `Command not found: ${command}`;
    }

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
      className="bg-black text-teal-400 font-mono h-screen p-6"
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
        <div className="mb-4">
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
            <div className="whitespace-pre" style={{ whiteSpace: "pre" }}>
              {line}
            </div>
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

{
  /*
  ToDo: 
  remove double scrolling on weather
  implement a game
  link to github and linkedIn
  add email command
  autofocus on input
  */
}
