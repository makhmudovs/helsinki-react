import React, { useEffect, useState } from "react";
import NoteService from "./services/notes";
import Note from "./conponents/note/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() * 0.5 ? true : false,
    };

    NoteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id: string) => {
    const note = notes.find((n) => n["id"] === id);
    const changedNote = { ...note, important: !note?.["important"] };

    NoteService.update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n['id'] !== id));
      });
  };
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note["important"]);

  useEffect(() => {
    NoteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  return (
    <>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            toggleImportance={toggleImportanceOf}
            key={note["id"]}
            note={note}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default App;
