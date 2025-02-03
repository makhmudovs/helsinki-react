import axios from "axios";

const getWeather = async (lat: string, long: string) => {
  return await axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=`
  );
};

export default {
  getWeather,
};
