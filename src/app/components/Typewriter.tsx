import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // Optional speed property to control typing speed
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 45 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingCompleted, setTypingCompleted] = useState(false);

  useEffect(() => {
    if (!typingCompleted) {
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(displayedText + text[currentIndex]);
          setCurrentIndex(currentIndex + 1);
        } else {
          clearInterval(typeInterval);
          setTypingCompleted(true);
        }
      }, speed);
      return () => clearInterval(typeInterval); // Cleanup interval on component unmount
    }
  }, [text, speed, currentIndex, displayedText, typingCompleted]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
