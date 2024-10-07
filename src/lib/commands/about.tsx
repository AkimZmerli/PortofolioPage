import Image from "next/image";
export function About(): JSX.Element {
  return (
    <div>
      <Image
        src="/about.png"
        alt="Avatar"
        width={300}
        height={150}
        className="text-teal-400"
      />
      <p>
        I am the world&apos;s next third best Web Developer. Join me in the
        fight against static and boring content.
      </p>
    </div>
  );
}
