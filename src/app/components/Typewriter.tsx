import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // Optional speed property to control typing speed
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 44 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(typeInterval);
      }
    }, speed);
    return () => clearInterval(typeInterval); // Cleanup interval on component unmount
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
