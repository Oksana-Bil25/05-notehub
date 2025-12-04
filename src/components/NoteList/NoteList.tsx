import { Note } from "../../types/note";
import NoteItem from "../NoteItem/NoteItem";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  if (notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </ul>
  );
};

export default NoteList;
