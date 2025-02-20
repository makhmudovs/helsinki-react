// @ts-ignore
// @ts-nocheck
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setTerm, Vote } from "../features/anecdotes/anecdoteSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "../request";

const AnecdoteList = () => {
  const queryCLient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess(updatedAnecdote) {
      queryCLient.setQueryData(["anecdotes"], (oldAnecdotes) => {
        if (oldAnecdotes) {
          const updatedAnecdoteIndex = oldAnecdotes.findIndex(
            (anecdote) => anecdote.id === updatedAnecdote.id
          );

          if (updatedAnecdoteIndex !== -1) {
            const newAnecdotes = [...oldAnecdotes];
            newAnecdotes[updatedAnecdoteIndex] = updatedAnecdote;
            return newAnecdotes;
          }
        }
        return oldAnecdotes;
      });
    },
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  // const { anecdotes, term } = useSelector((state: RootState) => state.anecdote);
  // const dispatch = useDispatch();

  // const filteredAnecdotes = term
  //   ? anecdotes.filter((anecdote) =>
  //       anecdote.anecdote.toLowerCase().includes(term.toLowerCase())
  //     )
  //   : anecdotes;

  const handleVote = async (anecdote) => {
    voteMutation.mutate({ ...anecdote, vote: anecdote.vote + 1 });
  };
  interface AnecdoteTypes {
    id: string;
    anecdote: string;
    vote: number;
  }
  return (
    <>
      {/* <div>
        <h4>Filter</h4>
        <input
          type="text"
          value={term}
          onChange={(e) => dispatch(setTerm(e.target.value))}
        />
      </div> */}
      {data.map((anecdote: AnecdoteTypes) => (
        <div key={anecdote.id}>
          <h4>{anecdote.anecdote}</h4>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <p>has vote : {anecdote.vote}</p>
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
