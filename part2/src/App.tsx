import VisibilityFilter from "./components/VisibilityFilter";
import Notes from "./components/Notes";
import NewNote from "./components/NewNote";

import { useDispatch } from "react-redux";
import { initializeNotes } from "./features/notes/noteSlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, []);
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
