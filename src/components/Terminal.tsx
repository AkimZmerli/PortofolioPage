// todo: implement command history properly.
// current state: input remembers last command/ cursor moves to the beginning/ errors compiling

"use client";
import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import Banner from "../lib/commands/banner";
import Typewriter from "./Typewriter";
import getWeather from "../lib/commands/weather";
import { help } from "../lib/commands/help";
import About from "@/lib/commands/whoami";
import { secret } from "../lib/commands/secret";
import { displayDate } from "../lib/commands/dispalyDate";
import { Minesweeper } from "./minesweeper";
import { EmailMe } from "../lib/commands/EmailMe";
import { Projects } from "../lib/commands/projects";

export function Terminal() {
  const [input, setInput] = useState<string>("");
  const [location, setLocation] = useState("Leipzig");
  const [showBanner, setShowBanner] = useState(true); // Start with the banner shown
  const [output, setOutput] = useState<React.ReactNode[]>([
    <p key="initial">Type &apos;help&apos; to search for commands</p>,
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [waitingForInput, setWaitingForInput] = useState<{
    action: (input: string) => void | Promise<void>;
    prompt?: string;
  } | null>(null);

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
  }, [output]);

  const handleWeatherCommand = (location: string) => {
    getWeather(location)
      .then((weatherData) => {
        setOutput((prevOutput) => [
          ...prevOutput,
          <pre key="weather">{weatherData}</pre>,
        ]);
        setLocation(location);
      })
      .catch((error) => {
        setOutput((prevOutput) => [
          ...prevOutput,
          <div key="weather-error" className="text-red-400 py-2">
            Error retrieving weather data for {location}: {error.message}
          </div>,
        ]);
      });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim() === "") {
        // If the input is empty or only whitespace, do nothing
        return;
      }

      const [command, ...args] = input.split(" ");
      if (command.toLowerCase() === "weather") {
        let location = "Leipzig"; // Default location
        if (args.length > 0) {
          location = args.join(" ");
        }
        handleWeatherCommand(location);
      } else {
        handleCommand(input);
      }
      setCommandHistory((prevHistory) => [...prevHistory, input]);
      setCommandIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      // Navigate up the command history
      if (commandHistory.length > 0) {
        const newIndex =
          commandIndex === -1 ? commandHistory.length - 1 : commandIndex + 1;
        setCommandIndex(newIndex);
        setInput(commandHistory[newIndex]);
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(
          commandHistory[newIndex].length,
          commandHistory[newIndex].length
        );
      }
    } else if (e.key === "ArrowDown") {
      // Navigate down the command history
      if (commandHistory.length > 0) {
        const newIndex =
          commandIndex === commandHistory.length - 1 ? -1 : commandIndex - 1;
        setCommandIndex(newIndex);
        setInput(newIndex === -1 ? "" : commandHistory[newIndex]);
        if (newIndex === -1) {
          inputRef.current?.focus();
        } else {
          inputRef.current?.focus();
          inputRef.current?.setSelectionRange(
            commandHistory[newIndex].length,
            commandHistory[newIndex].length
          );
        }
      }
    }
  };

  const handleCommand = (command: string, args?: string[]) => {
    let response: string | JSX.Element = "";

    switch (command.toLowerCase()) {
      case "help":
        response = help();
        break;
      case "whoami":
        response = <About />;
      case "projects": {
        const response = Projects();
        // use waitingforinput variable
        // instead of sending output
        // wait for input

        setWaitingForInput({
          action: response.action,
          prompt:
            "All of my incredible projects will appear right now. right here. press y for proceed and n for cancel.",
        });
        break;
      }
      case "email":
        response = EmailMe();
        break;
      case "weather":
        let locationToUse = "Leipzig";
        if (args && args.length > 0 && args[0].trim() !== "") {
          locationToUse = args[0];
        }
        getWeather(locationToUse)
          .then((weatherData) => {
            setOutput((prevOutput) => [
              ...prevOutput,
              <pre key="weather">{weatherData}</pre>,
            ]);
            setLocation(locationToUse);
          })
          .catch((error) => {
            setOutput((prevOutput) => [
              ...prevOutput,
              <div key="weather-error" className="text-red-400 py-2">
                Error retrieving weather data for {locationToUse}:{" "}
                {error.message}
              </div>,
            ]);
          });
        break;

      case "date":
        response = displayDate();
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
      <Typewriter key={`response-${output.length}`} content={response} />
    );

    setOutput((prevOutput) => [
      ...prevOutput,
      <div
        key={`command-${prevOutput.length}`}
        className="text-yellow-400 py-2"
      >
        visitor@webdev4life:~$ {command}
      </div>,
      <div key={`response-${prevOutput.length}`} className="text-teal-400 py-2">
        <Typewriter content={response} />
      </div>,
    ]);
  };

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
        {/* Banner Section */}
        {showBanner && (
          <div className="mb-4 mt-6">
            <Banner />
          </div>
        )}

        {/* Terminal Section */}
        {!output.length && !showBanner && (
          <div className="py-4">
            <p>Type &apos;help&apos; to search for commands</p>
          </div>
        )}

        {/* Output Container */}
        <div>
          {output.map((line, index) => (
            <div key={index} className="output py-2">
              <div className="whitespace-pre-wrap">{line}</div>
            </div>
          ))}

          {/* Input Line */}
          <div className="input flex items-center my-2">
            <span className="prompt mr-2">visitor@webdev4life:~$</span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                className="command bg-transparent outline-none text-teal-400 w-full"
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
                  height: "24px",
                  left: `${
                    input && input.length > 0 ? input.length * 10 + 1 : 0
                  }px`,
                  animation: "blinker 1s linear infinite",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div ref={bottomRef} />

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
