// types/note.ts
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface Note extends CreateNoteParams {
  _id: string;
  createdAt: string;
}
