export function EmailMe(): string {
  const emailLink = `mailto:akim.zmerli@googlemail.com?subject=This%20is%20no%20Spam`;
  window.location.href = emailLink;
  return "Don't email me, please. My inbox is full with requests already.... ";
}
