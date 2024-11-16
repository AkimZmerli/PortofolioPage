interface ProjectsResponse {
  message: string;
  action: (input: string) => void | Promise<void>;
}

// after projects command blinker on cursor stops

export function Projects(): ProjectsResponse {
  const handleInput = async (input: string) => {
    if (input.toLowerCase() === "y") {
      window.open("https://github.com/AkimZmerli", "_blank");
    } else if (input.toLowerCase() === "n") {
      return;
    }
  };

  return {
    message:
      "All of my incredible projects will appear right now. right here. press y for proceed and n for cancel.",
    action: handleInput,
  };
}
