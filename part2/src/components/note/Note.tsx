import React from "react";

interface NoteItems {
  id: string;
  content: string;
  important: boolean;
}
interface NoteProps {
  note: NoteItems;
  toggleImportance: (id: string) => void;
}

const Note: React.FC<NoteProps> = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      {note.content}
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => toggleImportance(note.id)}
      >
        {label}
      </button>
    </li>
  );
};

export default Note;
