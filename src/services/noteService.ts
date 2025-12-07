import axios from "axios";
import type { Note, NoteFormData, FetchNotesResponse } from "../types/note";

// Змінні оточення доступні через import.meta.env у Vite
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

// ❗ Використовуємо URL з ТЗ
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Додаємо Bearer Token
if (TOKEN) {
  api.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
} else {
  console.warn("VITE_NOTEHUB_TOKEN is not set. API calls may fail.");
}

// -----------------------------------------------------

/** Параметри для запиту (пагінація та пошук) */
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: params,
  });
  return response.data;
};

// ---- CREATE NOTE ----
export const createNote = async (data: NoteFormData): Promise<Note> => {
  const response = await api.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/notes/${id}`);
  return response.data;
};
