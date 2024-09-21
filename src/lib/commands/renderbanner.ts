import React from "react";
import Banner from "./banner";
import { defaultConfig } from "next/dist/server/config-shared";

// Define the type for the props
interface ShowBannerProps {
  setOutput: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  banner: React.ReactNode;
  setShowBanner: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function renderBanner({
  setOutput,
  banner,
  setShowBanner,
}: ShowBannerProps) {
  // Clear the output and display only the banner
  setOutput([banner]);
  setShowBanner(true);
}
