import axios from "axios";
import type { NoteTag as NoteTagType } from "../types/note";
import type { Note as NoteType } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export type Note = NoteType;
export type NoteTag = NoteTagType;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get(`${BASE_URL}/notes`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params: { page, perPage, search },
  });
  return response.data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const response = await axios.post(`${BASE_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return response.data;
};
