import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../features/anecdotes/anecdoteSlice";

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState("");
  const dispatch = useDispatch();

  const generateId = () => Number((Math.random() * 1000000).toFixed(0));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addAnecdote({ anecdote, id: String(generateId()), vote: 1 }));
    setAnecdote("");
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
