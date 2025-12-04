import type { FetchNotesResponse } from "../../services/noteService";

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
  });

  const notes = data?.notes || [];

  const handleDelete = (id: string) => {
    console.log("deleting note:", id);
    // Тут додаси запит на бекенд
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error!</p>}

      <NoteList notes={notes} onDelete={handleDelete} />
    </div>
  );
};
