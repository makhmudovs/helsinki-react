import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { InitializeAnecdotes } from "./features/anecdotes/anecdoteSlice";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitializeAnecdotes());
  }, []);

  return (
    <div className="container">
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
