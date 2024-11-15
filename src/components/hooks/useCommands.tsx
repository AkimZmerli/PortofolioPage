import { useState } from "react";
import { commandMap } from "@/components/TerminalCommandMap";

interface UseCommandsProps {
  onOutput: (output: React.ReactNode) => void;
  onClear: () => void;
  onBanner: () => void;
}

export const useCommands = ({
  onOutput,
  onClear,
  onBanner,
}: UseCommandsProps) => {
  const [waitingForInput, setWaitingForInput] = useState<{
    action: (input: string) => void | Promise<void>;
    prompt?: string;
  } | null>(null);

  const executeCommand = async (command: string, args: string[]) => {
    const commandKey = command.toLowerCase();
    const commandConfig = commandMap[commandKey];

    if (!commandConfig) {
      onOutput(
        <span className="text-red-400">Command not found: {command}</span>
      );
      return;
    }

    try {
      const response = await commandConfig.execute(...args);

      switch (commandKey) {
        case "clear":
          onClear();
          break;
        case "banner":
          onBanner();
          break;
        default:
          if (response.content) {
            onOutput(response.content);
          }
          if (response.waitForInput && response.action) {
            setWaitingForInput({
              action: response.action,
              prompt:
                typeof response.content === "string"
                  ? response.content
                  : undefined,
            });
          }
      }
    } catch (error) {
      onOutput(
        <span className="text-red-400">
          Error executing command:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </span>
      );
    }
  };

  return {
    executeCommand,
    waitingForInput,
    setWaitingForInput,
  };
};
