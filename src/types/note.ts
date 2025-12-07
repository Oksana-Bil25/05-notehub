// src/types/note.ts

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

/**
 * Інтерфейс для однієї нотатки, яка повертається з бекенда.
 * * ВАЖЛИВО: Хоча API повертає 'id',
 * цей інтерфейс використовує 'id' для забезпечення працездатності,
 * оскільки саме це поле присутнє у відповіді (замість '_id').
 */
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string; // Поле, що повертається API
}

/**
 * Інтерфейс для даних форми (payload для створення нотатки).
 */
export interface NoteFormData {
  title: string;
  content: string;
  tag: NoteTag;
}

/**
 * Інтерфейс для повної відповіді від API з пагінацією.
 * Відповідає структурі, яку ми бачили в консолі.
 */
export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalNotes: number;
  totalPages: number;
}
