import React, { FormEvent, useEffect, useState } from "react";
import NoteService from "./services/notes";
import LoginService from "./services/login";
import Note from "./components/note/Note";
import Notification from "./components/notification/Notification";
import Footer from "./components/footer/Footer";

const App = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() * 0.5 ? true : false,
    };

    NoteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id: string) => {
    const note = notes.find((n) => n["id"] === id);
    const changedNote = { ...note, important: !note?.["important"] };

    NoteService.update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        setNotes(notes.filter((n) => n["id"] !== id));
      });
  };
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note["important"]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await LoginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user));
      NoteService.setToken(user['token']);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("handle login: ", err);
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

 

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const noteForm = () => {
    return (
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    );
  };


  useEffect(() => {
    NoteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      NoteService.setToken(user.token);
    }
  }, []);
  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            toggleImportance={toggleImportanceOf}
            key={note["id"]}
            note={note}
          />
        ))}
      </ul>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user['name']} logged-in</p>
          {noteForm()}
        </div>
      )}
      <Footer />
    </>
  );
};

export default App;
