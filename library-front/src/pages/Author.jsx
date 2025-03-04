import React from "react";
import { useParams } from "react-router-dom";
import { ALL_AUTHORS, EDIT_AUTHOR, GET_AUTHOR } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Swal from "sweetalert2";

const Author = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_AUTHOR, {
    variables: { id },
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      Swal.fire({
        position: "top-right",
        title: "Error",
        text: `Failed to add: ${messages}`,
        icon: "error",
      });
    },
  });

  const [bornDate, setBornDate] = useState(2025);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }
  const author = data.getAuthor;

  const handleEditBorn = async (name) => {
    if (bornDate === 0 || bornDate === "" || bornDate === undefined) {
      return;
    }
    await editAuthor({ variables: { name, setBornTo: bornDate } });

    try {
      Swal.fire({
        position: "top-right",
        title: "Success!",
        text: "Born year edited successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        position: "top-right",
        title: "Error",
        text: `Failed to add: ${error.message}`,
        icon: "error",
      });
    }
  };
  return (
    <div className="mx-auto p-4 w-full max-w-2xl h-full md:h-auto">
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div className="flex justify-between border-gray-200 items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Author Details
          </h3>
        </div>

        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              value={author.name || ""}
              disabled={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Id
            </label>
            <input
              type="text"
              name="id"
              value={author.id || ""}
              disabled={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div>
            <label
              htmlFor="bookCount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Book count
            </label>
            <input
              type="number"
              name="bookCount"
              value={author.bookCount || 0}
              disabled={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div>
            <label
              htmlFor="born"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Born
            </label>

            {author.born !== null ? (
              <input
                type="number"
                name="born"
                disabled={true}
                value={author.born}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
            ) : (
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                type="number"
                min="1900"
                max="2099"
                step="1"
                value={bornDate}
                onChange={(e) => setBornDate(Number(e.target.value))}
              />
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            disabled={author.born !== null}
            type="button"
            onClick={() => handleEditBorn(author.name)}
            className={
              author.born !== null
                ? "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Author;

// export default function Search() {
//     function search(formData) {
//       const query = formData.get("query");
//       alert(`You searched for '${query}'`);
//     }
//     return (
//       <form action={search}>
//         <input name="query" />
//         <button type="submit">Search</button>
//       </form>
//     );
//   }
