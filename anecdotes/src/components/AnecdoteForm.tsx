import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setMessage,
  resetMessage,
  CrateAnecdote
} from "../features/anecdotes/anecdoteSlice";
const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(CrateAnecdote(anecdote));
    setAnecdote("");
    dispatch(setMessage(`You have added ${anecdote}`));
    setTimeout(() => {
      dispatch(resetMessage());
    }, 1500);
  };
  return (
    <div>
      <h3>Add a new anecdote</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="anecdote">Anectode</label>
        <textarea
          value={anecdote}
          onChange={(e) => setAnecdote(e.target.value)}
        >
          your anecdote...
        </textarea>
        <button type="submit">add anecdote</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
