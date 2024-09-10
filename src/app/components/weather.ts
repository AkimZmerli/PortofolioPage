import axios from "axios";

const location = "Leipzig";

const getWeather = async (location: string): Promise<string> => {
  try {
    const response = await fetch(`http://wttr.in/${location}?ATm`);
    // console.log(response.data);

    return response.text();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getWeather;

// const getWeather = async (location: string): Promise<string> => {
//   try {
//     const response = await axios.get(`http://wttr.in/${location}?format=j1`);
//     const data = response.data;
//     const asciiArt = data.current_condition[0].weatherIconUrl[0].value;
//     return asciiArt;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
