import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_PERSONS, EDIT_NUMBER } from "../queries";

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);
  // , {
  //     refetchQueries: [{ query: ALL_PERSONS }],
  //   }
  const submit = (event) => {
    event.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("Person not found", "error");
    }
  }, [result.data]);

  return (
    <div className="lg:w-1/3 :w-full border rounded-lg shadow-sm border-gray-200 p-4">
      <h3 className="text-3xl font-bold dark:text-white mb-2">Change Number</h3>

      <form onSubmit={submit} className="flex flex-col space-y-2">
        <div className="">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-light  text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 focus:outline-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type name"
            required={true}
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div className="">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-light  text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="bg-gray-50 border focus:outline-gray-200 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="28971861817"
            required={true}
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className="text-white mx-auto block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneForm;
