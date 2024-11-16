// import { useEffect, useRef } from "react";
// import { useTerminal } from "./useTerminal";

// export function useAutoScroll() {
//   const { inputRef, bottomRef, output } = useTerminal();

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const handleAutoScroll = () => {
//     if (bottomRef.current && inputRef.current) {
//       const { scrollTop, scrollHeight, clientHeight } =
//         inputRef.current.parentElement!;
//       const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
//       if (distanceToBottom <= 200) {
//         bottomRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   useEffect(() => {
//     handleAutoScroll();

//     if (inputRef.current) {
//       inputRef.current.value = ""; // reset the input value
//       inputRef.current.focus(); // focus the input field
//     }
//   }, [output, inputRef, bottomRef, handleAutoScroll]);

//   return { inputRef, bottomRef, output };
// }
