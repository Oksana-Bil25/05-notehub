import { useState, type ChangeEvent, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { AxiosError } from "axios";

import {
  fetchNotes,
  createNote,
  deleteNote,
  type FetchNotesParams,
} from "../../services/noteService";
import type { NoteFormData, FetchNotesResponse } from "../../types/note";

import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../LoadingIndicator/LoadingIndicator";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";

import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";

const NOTES_PER_PAGE = 12;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  const queryClient = useQueryClient();

  const queryParams: FetchNotesParams = {
    page: currentPage,
    perPage: NOTES_PER_PAGE,
    search: debouncedSearchQuery,
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotes(queryParams),

    retry: (failureCount, error) => {
      // Перевіряємо, чи є помилка AxiosError та чи має вона response
      if (error instanceof AxiosError && error.response?.status === 429) {
        return failureCount < 2;
      }
      return failureCount < 3;
    },
    retryDelay: (attempt) =>
      Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30000),
  });

  useEffect(() => {
    console.log("APP DEBUG: useQuery data:", data);
    console.log("APP DEBUG: Notes count:", data?.notes.length);
  }, [data]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const createNoteMutation = useMutation({
    mutationFn: (data: NoteFormData) => createNote(data),
    onSuccess: () => {
      setCurrentPage(1);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully!");
    },
    onError: () => toast.error("Failed to create note."),
  });

  const handleNoteSubmit = (values: NoteFormData) => {
    createNoteMutation.mutate(values);
    handleCloseModal();
  };

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully!");
    },
    onError: () => toast.error("Failed to delete note."),
  });

  const handleDelete = (id: string) => deleteMutation.mutate(id);

  const filteredNotes = data?.notes;
  const totalPages = data?.totalPages || 0;

  // Обробник зміни сторінки
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      <Toaster />

      {Array.isArray(filteredNotes) && filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} onDelete={handleDelete} />
      ) : (
        <p>No notes found.</p>
      )}

      {openModal && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onSubmit={handleNoteSubmit} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
