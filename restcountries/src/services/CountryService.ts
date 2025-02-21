import axios from "axios";
const baseUrl = "http://localhost:3006/countries";

const getAll = async () => await axios.get(baseUrl);

export default {
  getAll,
};
