// hooks/useTerminalInput.ts
import { useState, useRef, useEffect } from "react";

interface UseTerminalInputProps {
  onCommand: (command: string, args: string[]) => void;
  isWaitingForInput: boolean;
}

export const useTerminalInput = ({ onCommand }: UseTerminalInputProps) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const [command, ...args] = input.split(" ");
      onCommand(command, args);
      setInput("");
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    const handleGlobalBlur = () => {
      if (document.activeElement !== inputRef.current) {
        setIsFocused(false);
      }
    };

    window.addEventListener("click", handleGlobalBlur);
    return () => window.removeEventListener("click", handleGlobalBlur);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return {
    input,
    setInput,
    isFocused,
    inputRef,
    handleKeyDown,
    handleFocus,
    handleBlur,
  };
};
