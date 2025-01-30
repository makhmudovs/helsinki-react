import React from "react";

interface NoteItems {
  id: number;
  content: string;
  important: boolean;
}
interface NoteProps {
  note: NoteItems;
}

const Note: React.FC<NoteProps> = ({ note }) => {
  return <li>{note.content}</li>;
};

export default Note;
