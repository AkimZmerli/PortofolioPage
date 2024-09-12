export function EmailMe(): void {
  const emailLink = `mailto:akim.zmerli@googlemail.com`;
  window.location.href = emailLink;
  return "Don't email me, please. My inbox is full with requests already... ";
}
