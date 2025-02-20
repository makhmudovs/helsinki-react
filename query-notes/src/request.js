import axios from "axios";

const baseUrl = "http://localhost:3004/notes";

export const getNotes = () => axios.get(baseUrl).then((res) => res.data);

export const createNotes = (note) =>
  axios.post(baseUrl, note).then((res) => res.data);

export const updateNote = (updatedNote) =>
  axios
    .put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    .then((res) => res.data);
