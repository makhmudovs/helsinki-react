import React from "react";

interface PersonProps {
  name: string;
  number: string;
}

const Person: React.FC<PersonProps> = ({ name, number }) => {
  return (
    <li>
      {name} {"-"} <span style={{ fontWeight: "bold" }}>{number}</span>
    </li>
  );
};

export default Person;
