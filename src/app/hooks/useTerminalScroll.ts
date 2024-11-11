// hooks/useTerminalScroll.ts
import { useEffect, useRef } from "react";

export const useTerminalScroll = (
  output: any[],
  inputRef: React.RefObject<any>
) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAutoScroll = () => {

  useEffect(() => {
    handleAutoScroll();
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [output, inputRef]);

  return {
    bottomRef,
    handleAutoScroll,
  };
};
