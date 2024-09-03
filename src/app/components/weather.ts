import axios from "axios";

const getWeather = async (location: string): Promise<string> => {
  try {
    const response = await axios.get(`http://wttr.in/${location}?format=3`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getWeather;
