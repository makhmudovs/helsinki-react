import { Link } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          {anecdote.content}
          <Link to={`/anecdote/${anecdote.id}`}>View</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
