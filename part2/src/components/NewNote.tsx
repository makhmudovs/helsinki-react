import { useDispatch } from "react-redux";
import { createNote } from "../features/notes/noteSlice";
import { FormEvent, useState } from "react";
import NoteService from "../services/notes";

const NewNote = () => {
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  // const generateId = () => Number((Math.random() * 1000000).toFixed(0));
  const handleNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createNote(note));

    setNote("");
  };
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={handleNote}>
        <input
          name="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NewNote;
