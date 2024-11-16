import { help } from "@/lib/commands/help";
import About from "../lib/commands/whoami";
import { secret } from "../lib/commands/secret";
import { displayDate } from "@/lib/commands/dispalyDate";
import { Minesweeper } from "./minesweeper";
import { EmailMe } from "@/lib/commands/EmailMe";
import { Projects } from "../lib/commands/projects";
import { CommandResponse } from "../lib/commands/Commandtypes";
import { clearCommand } from "../lib/commands/clear";

interface CommandConfig {
  description: string;
  execute: (...args: string[]) => CommandResponse | Promise<CommandResponse>;
}
export interface CommandMap {
  [key: string]: CommandConfig;
}

export const commandMap: Record<string, CommandConfig> = {
  help: {
    description: "Show available commands",
    execute: () => ({
      content: help(),
      type: "info",
    }),
  },

  whoami: {
    description: "Display information about me",
    execute: () => ({
      content: <About />,
      type: "info",
    }),
  },

  projects: {
    description: "View my projects",
    execute: () => {
      const response = Projects();
      return {
        content: "Loading projects...press y for proceed and n for cancel.",
        type: "info",
        waitForInput: true,
        action: response.action,
      };
    },
  },

  email: {
    description: "Send me an email",
    execute: () => ({
      content: EmailMe(),
      type: "info",
    }),
  },

  date: {
    description: "Display current date and time",
    execute: () => ({
      content: displayDate(),
      type: "info",
    }),
  },

  minesweeper: {
    description: "Play a game of Minesweeper",
    execute: () => ({
      content: <Minesweeper />,
      type: "info",
    }),
  },

  clear: {
    description: "Clear the terminal screen",
    execute: () => ({
      content: clearCommand(),
      type: "success",
      stateChanges: {
        showBanner: false,
      },
    }),
  },

  banner: {
    description: "Show the terminal banner",
    execute: () => ({
      content: null,
      type: "success",
    }),
  },

  secret: {
    description: "🤫 Find out a secret",
    execute: () => ({
      content: secret(),
      type: "info",
    }),
  },
};

// Helper functions to work with commands
export const getAvailableCommands = (): string[] => {
  return Object.keys(commandMap);
};

export const getCommandDescription = (command: string): string => {
  return commandMap[command]?.description || "No description available";
};

export const isValidCommand = (command: string): boolean => {
  return command in commandMap;
};

// Hook to use commands
// hooks/useCommands.ts
