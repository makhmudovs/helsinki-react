import React from "react";

// interface NoteItems {
//   id: string;
//   content: string;
//   important: boolean;
// }
// interface NoteProps {
//   note: NoteItems;
//   toggleImportance: (id: string) => void;
// }

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>

      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note;
