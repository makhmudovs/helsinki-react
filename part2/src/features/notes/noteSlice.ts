import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoteItems {
  id: string;
  content: string;
  important: boolean;
}

export interface NoteState {
  notes: Array<NoteItems>;
}

const initialState: NoteState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    newNote: (state, action: PayloadAction<NoteItems>) => {
      console.log("payload", action.payload);
      state.notes.push(action.payload); // Use push() to mutate state
    },
    toggleImportance: (state, action: PayloadAction<{ id: string }>) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        note.important = !note.important; // Directly mutate using Immer
      }
    },
  },
});

export const { newNote, toggleImportance } = noteSlice.actions;
export default noteSlice.reducer;
