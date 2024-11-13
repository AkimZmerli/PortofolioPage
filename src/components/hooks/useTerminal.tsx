import { useState, useRef } from "react";

export const useTerminal = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState<React.ReactNode[]>([
    <p key="initial">Type &apos;help&apos; to search for commands</p>,
  ]);

  return { inputRef, bottomRef, output, setOutput };
};
