import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  // const [selected, setSelected] = useState(0);
  // const [maxVote, setMaxVote] = useState(null);

  // const setVoteWithMaxVote = () => {
  //   const max = votes.reduce(
  //     (prev, current) => (prev.vote > current.vote ? prev : current),
  //     0
  //   );
  //   setMaxVote(max.id);
  // };

  // const handleVote = () => {
  //   const nVotes = [...votes];
  //   nVotes[selected].vote += 1;
  //   setVotes(nVotes);
  //   setVoteWithMaxVote();
  // };
  // const setAnecdote = () => {
  //   setSelected(Math.floor(Math.random() * anecdotes.length));
  //   setVoteWithMaxVote();
  // };

  {/* {anecdotes[selected]}
      <p>has {votes[selected].vote}</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={setAnecdote}>next anecdote</button>
      <h3>Anecdote with the most votes</h3>
      {maxVote !== null ? anecdotes[maxVote] : ""} */}

  return (
    <div>
      <h1>Anecdotes</h1>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
