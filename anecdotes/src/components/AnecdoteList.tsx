import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../features/anecdotes/anecdoteSlice";
import { RootState } from "../app/store";

const AnecdoteList = () => {
  const anecdotes = useSelector((state: RootState) => state.anecdote.anecdotes);
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <h4>{anecdote.anecdote}</h4>
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <p>has vote : {anecdote.vote}</p>
              <button onClick={() => dispatch(vote(anecdote.id))}>Vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
