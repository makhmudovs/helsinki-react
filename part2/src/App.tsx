import { useEffect, useState, useRef } from "react";
import NoteService from "./services/notes";
import LoginService from "./services/login";
import Note from "./components/note/Note";
import Notification from "./components/notification/Notification";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/login/LoginForm";
import Togglable, { TogglableRef } from "./components/toggleable/Toggleable";
import NoteForm from "./components/NoteForm";


interface Note {
  content: string;
  id: string;
  important: boolean;
}

interface newNote {
  content: string;
  important: boolean;
}

interface LoginCreds {
  username: string;
  password: string;
}

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notes, setNotes] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  const togglableRef = useRef<TogglableRef>(null);

  const addNote = (newNote: newNote) => {
    if (togglableRef.current) {
      togglableRef.current.toggleVisibility();
    }
    NoteService.create(newNote).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
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

  const handleLogin = async (creds: LoginCreds) => {
    try {
      const user = await LoginService.login(creds);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      NoteService.setToken(user["token"]);
      setUser(user);
    } catch (err) {
      console.error("handle login: ", err);
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  useEffect(() => {
    NoteService.getAll().then((initialNotes) => {
      console.log("notes", initialNotes);
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
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
        <Togglable buttonLabel="log in" ref={togglableRef}>
          <LoginForm handleSubmit={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>{user["name"]} logged-in</p>
          <NoteForm addNote={addNote} />
        </div>
      )}
      <Footer />
    </>
  );
};

export default App;
