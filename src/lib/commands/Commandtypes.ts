export interface CommandResponse {
  content: React.ReactNode;
  type?: "success" | "error" | "info";
  waitForInput?: boolean;
  action?: (input: string) => void | Promise<void>;
  stateChange?: Record<string, any>;
}
