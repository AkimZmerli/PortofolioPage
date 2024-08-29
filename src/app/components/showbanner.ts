// showbanner.ts
import React from "react";

// Define the type for the props
interface ShowBannerProps {
  setOutput: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  banner: React.ReactNode;
}

export function showBanner({ setOutput, banner }: ShowBannerProps) {
  // Clear the output and display only the banner
  setOutput([banner]);
}
