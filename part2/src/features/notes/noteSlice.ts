import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import NoteService from "../../services/notes";

export interface NoteItems {
  id: string;
  content: string;
  important: boolean;
}

export interface NoteState {
  notes: Array<NoteItems>;
  filter: string;
}

export interface NoteAddItems {
  content: string;
  important: boolean;
}

const initialState: NoteState = {
  notes: [],
  filter: "ALL",
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    toggleImportance: (state, action: PayloadAction<{ id: string }>) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        note.important = !note.important; // Directly mutate using Immer
      }
    },
    setFilter: (state, action: PayloadAction<{ filter: string }>) => {
      state.filter = action.payload.filter;
    },
    appendNote: (state, action: PayloadAction<NoteItems>) => {
      state.notes.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload
    }
  },
});

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await NoteService.getAll();
    notes.forEach((note) => dispatch(appendNote(note)));
  };
};

/**
 * 
 * addNote: (state, action: PayloadAction<NoteItems>) => {
      console.log("payload", action.payload);
      state.notes.push(action.payload); // Use push() to mutate state
    },
 */

export const createNote = (content:string) =>{
  return async (dispatch) =>{
    const newNote = await NoteService.createNew(content);
    dispatch(appendNote(newNote));
  }
}

export const {toggleImportance, setFilter, appendNote } =
  noteSlice.actions;
export default noteSlice.reducer;
