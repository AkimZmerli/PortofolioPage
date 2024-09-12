import React, { useState, useEffect } from "react";

interface TypewriterProps {
  content: string | JSX.Element;
  speed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ content, speed = 45 }) => {
  const [displayedContent, setDisplayedContent] = useState<
    string | JSX.Element
  >("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingCompleted, setTypingCompleted] = useState(false);

  useEffect(() => {
    if (typeof content === "string") {
      if (!typingCompleted) {
        const typeInterval = setInterval(() => {
          if (currentIndex < content.length) {
            setDisplayedContent(
              (prevContent) => prevContent + content[currentIndex]
            );
            setCurrentIndex((prevIndex) => prevIndex + 1);
          } else {
            clearInterval(typeInterval);
            setTypingCompleted(true);
          }
        }, speed);
        return () => clearInterval(typeInterval);
      }
    } else {
      setDisplayedContent(content);
      setTypingCompleted(true);
    }
  }, [content, speed, currentIndex, typingCompleted]);

  return <span>{displayedContent}</span>;
};

export default Typewriter;
