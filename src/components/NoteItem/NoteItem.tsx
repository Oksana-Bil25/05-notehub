interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  return (
    <li className={styles.listItem}>
      <h3 className={styles.title}>{note.title}</h3>
      <p className={styles.content}>{note.content}</p>

      <div className={styles.footer}>
        <span className={styles.tag}>{note.tag}</span>

        <button className={styles.button} onClick={() => onDelete(note._id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
