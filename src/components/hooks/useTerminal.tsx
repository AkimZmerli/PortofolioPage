import { useState, useRef, useCallback, useEffect } from "react";

export const useTerminal = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState<React.ReactNode[]>([
    <p key="initial">Type &apos;help&apos; to search for commands</p>,
  ]);

  const handleAutoScroll = useCallback(() => {
    if (bottomRef.current && inputRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        inputRef.current.parentElement!;

      const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
      if (distanceToBottom <= 200) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    handleAutoScroll();
  }, [handleAutoScroll, output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [output]);

  return {
    inputRef,
    bottomRef,
    output,
    setOutput,
    handleAutoScroll,
  };
};
