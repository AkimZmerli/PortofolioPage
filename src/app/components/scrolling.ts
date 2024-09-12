import { useRef, useEffect } from "react";

export const useScrollToPrompt = () => {
  const promptRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (promptRef.current && window.scrollY > promptRef.current.offsetTop) {
        promptRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return promptRef;
};
