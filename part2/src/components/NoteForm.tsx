import React, { useState } from "react";

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState("testing a form...");
  const createNote = (e) => {
    e.preventDefault();
    addNote({
      content: newNote,
      important: true,
    });

    setNewNote("");
  };
  return (
    <form onSubmit={createNote}>
      <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
      <button type="submit">save</button>
    </form>
  );
};

export default NoteForm;
