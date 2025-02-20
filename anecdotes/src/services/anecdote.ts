import axios from "axios";
const baseUrl = "http://localhost:3005/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

interface CreateNewAnecdote {
  anecdote: string;
  vote: number;
}

const createNew = async (anecdote: CreateNewAnecdote) => {
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const vote = async (id: string) => {
  const anecdote = await axios.get(baseUrl + `/${id}`);
  anecdote.data.vote = anecdote.data.vote += 1;
  const response = await axios.put(baseUrl + `/${id}`, anecdote.data);
  return response.data;
};

export default { getAll, createNew, vote };
