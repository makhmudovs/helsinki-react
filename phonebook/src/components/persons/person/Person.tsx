import React from "react";

interface PersonProps {
  name: string;
  number: string;
  id: string;
  handleDelete: (id: string) => void;
}

const Person: React.FC<PersonProps> = ({ name, number, handleDelete, id }) => {
  return (
    <li>
      {name} {"-"} <span style={{ fontWeight: "bold" }}>{number}</span>
      <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(id)}>
        delete
      </button>
    </li>
  );
};

export default Person;
