import React from "react";

interface PersonFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newName: string;
  handleNewName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newPhone: string;
  handleNewPhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({
  handleSubmit,
  newName,
  handleNewName,
  newPhone,
  handleNewPhone,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newPhone} onChange={handleNewPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
