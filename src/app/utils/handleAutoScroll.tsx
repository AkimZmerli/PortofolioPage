import { useRef, useEffect, useState } from "react";
import { useTerminal } from "../../components/hooks/useTerminal";

const handleAutoScroll = () => {
  const { inputRef, bottomRef, output } = useTerminal();
  if (bottomRef.current && inputRef.current) {
    const { scrollTop, scrollHeight, clientHeight } =
      inputRef.current.parentElement!;

    // Check if the bottom is near by 100 pixels
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
    if (distanceToBottom <= 200) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    handleAutoScroll();
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef, output]);
};

export default handleAutoScroll;
