import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import BookForm from "../components/BookForm";

const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS);

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
  console.log("data is", data);
  return (
    <div className="shados-xs rounded-lg p-4 bg-white">
      <div className="flex mb-4 justify-between">
        <h2 className="text-4xl font-bold dark:text-white mb-4">Books</h2>
        <BookForm />
      </div>
      <div className="relative overflow-x-auto">
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
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">{book.published}</td>
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
