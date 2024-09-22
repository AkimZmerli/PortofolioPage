export function help(): number {
  const myNumber = 123456789;
  const convertedNumber = myNumber.toString();
  const result = convertedNumber.split("").reverse().join("");
  return `Your numbers are ${result}`;
}

// "Available commands: help, about, weather, minesweeper, contact, clear, banner, secret, delete";
