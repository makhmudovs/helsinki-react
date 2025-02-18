import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AnecdoteItems {
  anecdote: string;
  id: string;
  vote: number;
}

export interface AnecdoteState {
  anecdotes: AnecdoteItems[];
}

const initialState: AnecdoteState = {
  anecdotes: [
    { anecdote: "If it hurts, do it more often.", id: "cuyagcha", vote: 2 },
    {
      anecdote: "Adding manpower to a late software project makes it later!",
      id: "abcd1234",
      vote: 0,
    },
    {
      anecdote:
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      id: "efgh5678",
      vote: 0,
    },
    {
      anecdote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      id: "ijkl9101",
      vote: 0,
    },
    {
      anecdote: "Premature optimization is the root of all evil.",
      id: "mnop1121",
      vote: 0,
    },
    {
      anecdote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      id: "qrst3141",
      vote: 0,
    },
    {
      anecdote:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      id: "uvwx5161",
      vote: 0,
    },
    {
      anecdote: "The only way to go fast, is to go well.",
      id: "yzab7181",
      vote: 0,
    },
  ],
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
    vote: (state, action: PayloadAction<string>) => {
      state.anecdotes.map((anecdote) => {
        if (action.payload === anecdote.id) {
          anecdote.vote += 1;
        }
      });

      // Sort anecdotes by votes in descending order
      state.anecdotes.sort((a, b) => b.vote - a.vote);
    },
    addAnecdote: (state, action: PayloadAction<addAnecdote>) => {
      state.anecdotes.push({
        anecdote: action.payload.anecdote,
        id: action.payload.id,
        vote: action.payload.vote,
      });
      // Sort anecdotes by votes in descending order
      state.anecdotes.sort((a, b) => b.vote - a.vote);
    },
  },
});

// Action creators are generated for each case reducer function
export const { vote, addAnecdote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
