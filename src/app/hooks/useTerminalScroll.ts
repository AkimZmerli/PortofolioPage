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
};

export default useTerminalScroll;

// import { useRef, useEffect, useState } from "react";
// import { useTerminal } from "../../components/hooks/useTerminal";

// const AutoScrollComponent = () => {
//   const { inputRef, bottomRef, output } = useTerminal();

//   const handleAutoScroll = () => {
//     if (bottomRef.current && inputRef.current) {
//       const { scrollTop, scrollHeight, clientHeight } =
//         inputRef.current.parentElement!;

//       // Check if the bottom is near by 100 pixels
//       const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
//       if (distanceToBottom <= 200) {
//         bottomRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   // Call handleAutoScroll when needed
//   useEffect(() => {
//     handleAutoScroll();
//   }, [output]);

//   return null; // or return some JSX
// };

// Alternatively, you can create a new custom React Hook function that calls the useTerminal hook and then returns the result:

// import { useRef, useEffect, useState } from "react";
// import { useTerminal } from "../../components/hooks/useTerminal";

// const AutoScrollComponent = () => {
//   const { inputRef, bottomRef, output } = useTerminal();

//   const handleAutoScroll = () => {
//     if (bottomRef.current && inputRef.current) {
//       const { scrollTop, scrollHeight, clientHeight } =
//         inputRef.current.parentElement!;

//       // Check if the bottom is near by 100 pixels
//       const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
//       if (distanceToBottom <= 200) {
//         bottomRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   // Call handleAutoScroll when needed
//   useEffect(() => {
//     handleAutoScroll();
//   }, [output]);

//   return null; // or return some JSX
// };

// import { useAutoScroll } from "./useAutoScroll";

// Then, you can use the useAutoScroll hook in your React component:

// const MyComponent = () => {
//   const handleAutoScroll = useAutoScroll();

//   // Call handleAutoScroll when needed
//   useEffect(() => {
//     handleAutoScroll();
//   }, []);

//   return null; // or return some JSX
// };
