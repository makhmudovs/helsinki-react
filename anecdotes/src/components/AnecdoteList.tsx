import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setTerm, Vote } from "../features/anecdotes/anecdoteSlice";

const AnecdoteList = () => {
  const { anecdotes, term } = useSelector((state: RootState) => state.anecdote);
  const dispatch = useDispatch();

  const filteredAnecdotes = term
    ? anecdotes.filter((anecdote) =>
        anecdote.anecdote.toLowerCase().includes(term.toLowerCase())
      )
    : anecdotes;

  const handleVote = async (id: string) => {
    dispatch(Vote(id));
  };
  return (
    <>
      <div>
        <h4>Filter</h4>
        <input
          type="text"
          value={term}
          onChange={(e) => dispatch(setTerm(e.target.value))}
        />
      </div>
      {filteredAnecdotes &&
        filteredAnecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <h4>{anecdote.anecdote}</h4>
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <p>has vote : {anecdote.vote}</p>
              <button onClick={() => handleVote(anecdote.id)}>Vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
