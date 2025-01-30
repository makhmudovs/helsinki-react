import React from "react";
import Person from "./person/Person";

interface PersonItems {
  name: string;
  number: string;
  id: number;
}
interface PersonProps {
  persons: PersonItems[];
}

const Persons: React.FC<PersonProps> = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </ul>
  );
};

export default Persons;
