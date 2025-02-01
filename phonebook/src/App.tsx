import { useEffect, useState } from "react";
import PersonService from "./services/person";
import Filter from "./components/filter/Filter";
import PersonForm from "./components/personForm/PersonForm";
import Persons from "./components/persons/Persons";
import Notification from "./components/notification/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState("green");

  const getPersons = () => {
    PersonService.getAll().then((persons) => {
      setPersons(persons);
    });
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setFilterName(query);
  };

  const handleNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const duplicateName = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (newName === "" || !newName || newPhone === "" || !newPhone) {
      return;
    }

    if (duplicateName) {
      const sure = confirm(
        `${newName} is already in the phonebook, replace the old number with the new one?`
      );
      if (sure) {
        PersonService.updateContact(duplicateName.id, {
          name: newName,
          number: newPhone,
        })
          .then((res) => {
            setMessage(`${newName} added successfully`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNewPhone("");
            getPersons();
          })
          .catch((err) => {
            console.log(err);
            setMessage(`Cannot change the number plz refresh`);
            setColor("red");
            setTimeout(() => {
              setMessage(null);
              setColor("green");
            }, 5000);
          });
      } else {
        return;
      }
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      };

      PersonService.create(personObject)
        .then((returnData) => {
          setPersons(persons.concat(returnData));
          setMessage(`${newName} added successfully`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setNewName("");
          setNewPhone("");
        })
        .catch((err) => {
          setMessage(`${err} occured`);
          setColor("red");
          setTimeout(() => {
            setMessage(null);
            setColor("green");
          }, 5000);
        });
    }
  };

  // Filter the persons array based on the filterName
  const filteredPersons = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons;

  const handleDelete = (id: string) => {
    const sure = confirm(`Are you sure u want to delete person with ${id}`);
    if (sure) {
      //delete
      PersonService.deleteContact(id)
        .then((returnData) => {
          setMessage(`${returnData.name} deleted successfully`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p["id"] !== returnData.id));
        })
        .catch((err) => {
          setMessage(`${err} occured`);
          setColor("red");
          setTimeout(() => {
            setMessage(null);
            setColor("green");
          }, 5000);
        });
    }
  };

  useEffect(() => {
    getPersons();
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification color={color} message={message} />
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
      />
      <h3>Numbers</h3>
      <Persons handleDelete={handleDelete} persons={filteredPersons} />
    </div>
  );
};

export default App;
