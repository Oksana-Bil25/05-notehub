
import NoteItem from "../NoteItem/NoteItem";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  // Фільтр не потрібен, якщо API завжди повертає валідні дані, але залишаємо для безпеки
  const renderableNotes = notes.filter((note) => note.id);

  if (renderableNotes.length === 0) {
    return <p className={css.noNotes}>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {renderableNotes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default NoteList;
