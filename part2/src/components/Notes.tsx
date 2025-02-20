import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportance } from "../features/notes/noteSlice";
import { RootState } from "../app/store";
import Note from "./Note";

const Notes = () => {
  const { notes, filter } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();
  const filteredNotes =
    filter === "ALL"
      ? notes
      : filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  return (
    <ul>
      {filteredNotes.length > 0 &&
        filteredNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => dispatch(toggleImportance({ id: note.id }))}
          />
        ))}
    </ul>
  );
};

export default Notes;
