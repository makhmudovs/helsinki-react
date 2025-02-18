import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "../features/notes/noteSlice";

export const store = configureStore({
  reducer: {
    notes: NotesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
