// hooks/useTerminalScroll.ts
import { useEffect, useRef } from "react";

export const useTerminalScroll = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAutoScroll = () => {
    if (bottomRef.current) {
      const terminal = bottomRef.current.parentElement;
      if (terminal) {
        const { scrollTop, scrollHeight, clientHeight } = terminal;
        const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

        if (distanceToBottom <= 200) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return {
    bottomRef,
    handleAutoScroll,
  };
};
