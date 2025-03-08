import { useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { ALL_BOOKS, CREATE_BOOK, BOOK_ADDED } from "../queries";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

// Function to update cache
export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, (data) => {
    const allBooks = data?.allBooks || []; // Default to empty array if allBooks is null/undefined
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

const BookForm = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState("refactoring");

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      Swal.fire({
        position: "top-right",
        title: "Success",
        text: `Book added: ${addedBook.title}`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const [createBook, result] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
    },
  });

  const panelVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  const handleNewBook = async (e) => {
    e.preventDefault();

    try {
      const data = {
        title,
        author,
        published: Number(published),
        genres: [genre],
      };
      console.log(data);
      await createBook({ variables: data });

      Swal.fire({
        position: "top-right",
        title: "Success!",
        text: "New book added",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      console.log(result.data);

      setTitle("");
      setAuthor("");
      setPublished(0);
      setGenre("refactoring");
    } catch (err) {
      Swal.fire({
        position: "top-right",
        title: "Error",
        text: `Failed to add: ${err.message}`,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add book
        </button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <motion.div
          className="relative p-4 w-full max-w-2xl max-h-full"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <DialogPanel className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Book
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <Description className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Add new book
              </Description>
              <form onSubmit={handleNewBook}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type book title"
                      required={true}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="author"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Author name"
                      required={true}
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="published"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Published
                    </label>
                    <input
                      type="number"
                      name="published"
                      id="published"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Year"
                      value={published}
                      onChange={(e) => setPublished(e.target.value)}
                      required={true}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Genre
                    </label>
                    <select
                      required={true}
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="refactoring">Refactoring</option>
                      <option value="agile">Agile</option>
                      <option value="patterns">Patterns</option>
                      <option value="design">Design</option>
                      <option value="classic">Classic</option>
                      <option value="crime">Crime</option>
                      <option value="revolution">Revolution</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
          </DialogPanel>
        </motion.div>
      </Dialog>
    </>
  );
};

export default BookForm;
