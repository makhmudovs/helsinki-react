import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",

    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([
    { id: 0, vote: 0 },
    { id: 1, vote: 0 },
    { id: 2, vote: 0 },
    { id: 3, vote: 0 },
    { id: 4, vote: 0 },
    { id: 5, vote: 0 },
    { id: 6, vote: 0 },
    { id: 7, vote: 0 },
  ]);
  const handleVote = () => {
    const nVotes = [...votes];
    nVotes[selected].vote += 1;
    setVotes(nVotes);
  };
  const setAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  return (
    <div>
      {anecdotes[selected]}
      <p>has {votes[selected].vote}</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={setAnecdote}>next anecdote</button>
    </div>
  );
};

export default App;
