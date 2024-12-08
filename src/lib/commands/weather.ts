const getWeather = async (location: string): Promise<string> => {
  try {
    const response = await fetch(`https://wttr.in/${location}?ATm`);
    // console.log(response.data);

    return response.text();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getWeather;
