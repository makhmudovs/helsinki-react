import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { FIND_PERSON } from "../queries";
import Person from "./Person";


const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }
  return (
    <div>
      <h2 className="text-4xl font-bold dark:text-white mb-2">Persons</h2>
      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {persons.map((p) => (
          <li className="mb-4" key={p.id}>
            {p.name} {p.phone}
            <button
              onClick={() => setNameToSearch(p.name)}
              type="button"
              className='ms-2 font-medium text-sm text-blue-600 dark:text-blue-500 hover:underline'
            >
              Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Persons.propTypes = {
  persons: PropTypes.array.isRequired,
};

export default Persons;
