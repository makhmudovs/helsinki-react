import { useState } from "react";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import Note from "./components/Note";
import Notes from "./pages/Notes";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { Container, Alert } from "@mui/material";
import Navigation from "./components/Navigation";


const App = () => {
  const [notes] = useState([
    {
      id: 1,
      content: "HTML is easy",
      important: true,
      user: "Matti Luukkainen",
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false,
      user: "Matti Luukkainen",
    },
    {
      id: 3,
      content: "Most important methods of HTTP-protocol are GET and POST",
      important: true,
      user: "Arto Hellas",
    },
  ]);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const login = (user) => {
    setUser(user);
    setMessage(`Welcome user `, user);
    setTimeout(() => {
      setMessage(null);
    }, 2500);
  };

  const match = useMatch("/notes/:id");
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  return (
    <Container>
      {message && <Alert severity="success">{message}</Alert>}
      <Navigation />

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login user={user} onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <br />
        <em>Note app, Department of Computer Science 2023</em>
      </div>
    </Container>
  );
};

export default App;
