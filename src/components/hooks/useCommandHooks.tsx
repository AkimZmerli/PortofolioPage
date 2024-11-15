// hooks/useCommands.ts
import { useState, useCallback } from "react";
import { commandMap } from "@/components/TerminalCommandMap";
import getWeather from "@/lib/commands/weather";

interface UseCommandsOptions {
  onOutput: (content: React.ReactNode) => void;
  onClear: () => void;
  onBanner: () => void;
  onStateChange?: (newState: any) => void;
}

interface WaitingForInput {
  action: (input: string) => void | Promise<void>;
  prompt?: string;
}

export const useCommands = ({
  onOutput,
  onClear,
  onBanner,
  onStateChange,
}: UseCommandsOptions) => {
  const [waitingForInput, setWaitingForInput] =
    useState<WaitingForInput | null>(null);
  const [location, setLocation] = useState("Leipzig");

  const handleWeatherCommand = useCallback(
    async (locationArg?: string) => {
      const targetLocation = locationArg || location;
      try {
        const weatherData = await getWeather(targetLocation);
        onOutput(
          <pre key={`weather-${Date.now()}`} className="text-teal-400">
            {weatherData}
          </pre>
        );
        setLocation(targetLocation);
      } catch (error) {
        onOutput(
          <div key={`weather-error-${Date.now()}`} className="text-red-400">
            Error retrieving weather data for {targetLocation}:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </div>
        );
      }
    },
    [location, onOutput]
  );

  const executeCommand = useCallback(
    async (command: string, args: string[] = []) => {
      // If we're waiting for input, handle that first
      if (waitingForInput) {
        await waitingForInput.action(command);
        setWaitingForInput(null);
        return;
      }

      const commandLower = command.toLowerCase();

      // Handle special commands that need custom logic
      switch (commandLower) {
        case "clear":
          onClear();
          return;

        case "banner":
          onBanner();
          return;

        case "weather":
          await handleWeatherCommand(args[0]);
          return;
      }

      // Handle regular commands from commandMap
      const commandConfig = commandMap[commandLower];
      if (!commandConfig) {
        onOutput(
          <span className="text-red-400">
            Command not found: {command}. Type &apos;help&apos; for available
            commands.
          </span>
        );
        return;
      }

      try {
        const response = await commandConfig.execute(...args);

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

        if (response.stateChange && onStateChange) {
          onStateChange(response.stateChange);
        }
      } catch (error) {
        onOutput(
          <span className="text-red-400">
            Error executing command:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </span>
        );
      }
    },
    [
      waitingForInput,
      handleWeatherCommand,
      onOutput,
      onClear,
      onBanner,
      onStateChange,
    ]
  );

  const cancelWaitingForInput = useCallback(() => {
    setWaitingForInput(null);
  }, []);

  return {
    executeCommand,
    waitingForInput,
    cancelWaitingForInput,
    isWaitingForInput: !!waitingForInput,
  };
};
