import Image from "next/image";
import { useState, useEffect } from "react";
import Typewriter from "../../components/Typewriter";
export default function About() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Typewriter content="I am the world's next third best Web Developer. Join me in the fight against boring content. That's me below this line" />
      {showImage && (
        <div className="pt-5">
          <Image
            src="/aboutImage.jpg"
            alt="SonOfaGun"
            width={300}
            height={250}
          />
        </div>
      )}
    </div>
  );
}
