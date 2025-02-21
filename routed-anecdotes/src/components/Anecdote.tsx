import React from "react";

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.author}</div>
      <div>
        {anecdote.votes > 1 ? "Votes:" : "Vote:"}{" "}
        <strong>{anecdote.votes}</strong>
      </div>
    </div>
  );
};

export default Anecdote;
