import axios from "axios";

const baseUrl = "http://localhost:3005/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

interface CreateAnecdoteTypes {
  anecdote: string;
  vote: number;
}
export const createAnecdotes = (anecdote: CreateAnecdoteTypes) =>
  axios.post(baseUrl, anecdote).then((res) => res.data);

interface UpdateAnecdoteTypes {
  id: string;
  anecdote: string;
  vote: number;
}

export const updateAnecdote = (updatedAnecdote: UpdateAnecdoteTypes) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);



    // {
    //   "anecdote": "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    //   "id": "efgh5678",
    //   "vote": 0
    // },
    // {
    //   "anecdote": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    //   "id": "ijkl9101",
    //   "vote": 0
    // },
    // {
    //   "anecdote": "Premature optimization is the root of all evil.",
    //   "id": "mnop1121",
    //   "vote": 2
    // },
    // {
    //   "anecdote": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    //   "id": "qrst3141",
    //   "vote": 0
    // },
    // {
    //   "anecdote": "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    //   "id": "uvwx5161",
    //   "vote": 0
    // },
    // {
    //   "anecdote": "The only way to go fast, is to go well.",
    //   "id": "yzab7181",
    //   "vote": 0
    // }