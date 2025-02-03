import axios from "axios";
const baseUrl = "http://localhost:3001/countries";

const getAll = async () => await axios.get(baseUrl);

export default {
  getAll,
};
