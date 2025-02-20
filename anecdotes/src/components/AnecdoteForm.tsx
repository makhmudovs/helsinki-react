import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { createAnecdotes } from "../request";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [anecdote, setAnecdote] = useState("");

  interface Anecdote {
    id: string;
    anecdote: string;
    vote: number;
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      const anecdotes = queryClient.getQueryData(["anecdotes"]) as Anecdote[]; // Type assertion
      if (anecdotes) {
        queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newAnecdoteMutation.mutate({ anecdote, vote: 1 });
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
