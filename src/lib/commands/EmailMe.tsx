import Typewriter from "@/components/Typewriter";

export function EmailMe() {
  const emailLink = `mailto:akim.zmerli@googlemail.com?subject=This%20is%20no%20Spam`;
  window.location.href = emailLink;
  return (
    <div>
      <Typewriter content="Don't email me, please. My inbox is full with requests already.... " />
    </div>
  );
}
