import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import BookForm from "../components/BookForm";
import { useState } from "react";

const Books = () => {
  const [filter, setFilter] = useState("");
  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  });

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
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const books = data.allBooks;

  return (
    <div className="shados-xs rounded-lg p-4 bg-white">
      <div className="flex mb-4 justify-between">
        <h2 className="text-4xl font-bold dark:text-white mb-4">Books</h2>
        <BookForm />
      </div>
      <div className="relative overflow-x-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            refetch({
              genre: filter === "" ? null : filter.toLowerCase(), // Use null for "All"
            }).then((result) =>
              console.log("Refetched data:", result.data.allBooks)
            );
          }}
          className="w-fit ms-auto flex items-center space-x-2 mb-2"
        >
          <select
            onChange={({ target }) => setFilter(target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="">All</option>
            <option value="refactoring">Refactoring</option>
            <option value="agile">Agile</option>
            <option value="patterns">Patterns</option>
            <option value="design">Design</option>
            <option value="classic">Classic</option>
            <option value="crime">Crime</option>
            <option value="revolution">Revolution</option>
          </select>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Filter
          </button>
        </form>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-100 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Published
              </th>
              <th scope="col" className="px-6 py-3">
                Genres
              </th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, i) => (
                <tr
                  key={book.id}
                  className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 w-10">{i + 1}</td>
                  <td className="px-6 py-4">{book.title}</td>
                  <td className="px-6 py-4">{book.author.name}</td>
                  <td className="px-6 py-4">{book.published}</td>
                  <td className="px-6 py-4 capitalize">
                    {book.genres.join(" ")}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan="4" className="px-6 py-4 text-center">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
