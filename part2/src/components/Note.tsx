interface NoteItems {
  id: string;
  content: string;
  important: boolean;
}
interface NoteProps {
  note: NoteItems;
  handleClick: () => void;
}

const Note: React.FC<NoteProps> = ({ note, handleClick }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={handleClick}>{label}</button>
    </li>
  );
};

export default Note;
