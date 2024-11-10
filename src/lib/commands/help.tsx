import Typewriter from "../../components/Typewriter";

export function help() {
  return (
    <div>
      <Typewriter content="Available commands: whoami, date, projects, weather, email, clear, banner" />
    </div>
  );
}
// : number {
//   const myNumber = 123456789;
//   const convertedNumber = myNumber.toString();
//   const result = convertedNumber.split("").reverse().join("");
//   return `Your number is ${result}`
