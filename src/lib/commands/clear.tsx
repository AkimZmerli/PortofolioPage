export function clearCommand() {
  return {
    content: <p key="initial">Type &apos;help&apos; to search for commands</p>,
    type: "clear",
    stateChanges: {
      showBanner: false,
    },
  };
}
