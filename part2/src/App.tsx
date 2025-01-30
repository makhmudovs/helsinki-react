import React from "react";
import Note from "./conponents/note/Note";

interface AppItems {
  id: number;
  content: string;
  important: boolean;
}

interface AppProps {
  notes: AppItems[];
}

const App: React.FC<AppProps> = ({ notes }) => {
  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </>
  );
};

export default App;
