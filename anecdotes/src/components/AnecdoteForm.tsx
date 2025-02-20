import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { createAnecdotes } from "../request";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [anecdote, setAnecdote] = useState("");
  const dispatch = useNotificationDispatch();
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
    dispatch({ type: "SUCC", payload: `${anecdote} added successfully` });
    setTimeout(() => {
      dispatch({ type: "RESET" });
    }, 2000);
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
