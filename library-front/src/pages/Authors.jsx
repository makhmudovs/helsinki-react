import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ALL_AUTHORS } from "../queries";

const Authors = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

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

  const authors = data.allAuthors;
  console.log("data is", data);
  return (
    <div className="shados-xs rounded-lg p-4 bg-white">
      <h2 className="text-4xl font-bold dark:text-white mb-4">Authors</h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-100 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-10">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Born
              </th>
              <th scope="col" className="px-6 py-3">
                Bookcount
              </th>
              <th scope="col" className="px-6 py-3 w-10">
                #
              </th>
            </tr>
          </thead>
          <tbody>
            {authors.length > 0 ? (
              authors.map((author, i) => (
                <tr
                  key={author.id}
                  className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 w-10">{i + 1}</td>
                  <td className="px-6 py-4">{author.name}</td>
                  <td className="px-6 py-4">{author.born || "N/A"}</td>
                  <td className="px-6 py-4">{author.bookCount}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/author/${author.id}`}

                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan="4" className="px-6 py-4 text-center">
                  No authors available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Authors;
