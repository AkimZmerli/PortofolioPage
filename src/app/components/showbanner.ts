import React from "react";

interface ShowBannerProps {
  setOutput: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  banner: JSX.Element;
}

// Define and export the showBanner function
export function showBanner({ setOutput, banner }: ShowBannerProps) {
  // Clear the output and display only the banner
  setOutput([banner]);
}
