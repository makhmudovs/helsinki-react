import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import AnecdoteService from "../../services/anecdote";
import anecdote from "../../services/anecdote";

export interface AnecdoteItems {
  anecdote: string;
  id: string;
  vote: number;
}

export interface AnecdoteState {
  anecdotes: AnecdoteItems[];
  term: string;
  message: string;
}

const initialState: AnecdoteState = {
  anecdotes: [],
  term: "",
  message: "",
};

interface addAnecdote {
  anecdote: string;
  id: string;
  vote: number;
}

export const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    setTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },

    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    resetMessage: (state) => {
      state.message = "";
    },
    setAnecdotes: (state, action: PayloadAction<AnecdoteItems>) => {
      state.anecdotes.push(action.payload);

      // Sort anecdotes by votes in descending order
      state.anecdotes.sort((a, b) => b.vote - a.vote);
    },
  },
});

export const InitializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await AnecdoteService.getAll();
    anecdotes.forEach((anecdote) => dispatch(setAnecdotes(anecdote)));
  };
};

export const CrateAnecdote = (anecdote: string) => {
  return async (dispatch) => {
    const newAnecdote = await AnecdoteService.createNew({ anecdote, vote: 1 });
    dispatch(setAnecdotes(newAnecdote));
  };
};

export const Vote = (id:string)=>{
  return async (dispatch)=>{
    const votedAnecdote = await AnecdoteService.vote(id);
    dispatch(setAnecdotes(votedAnecdote));
  }
}

// Action creators are generated for each case reducer function
export const {
  setTerm,
  setMessage,
  resetMessage,
  setAnecdotes,
} = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
