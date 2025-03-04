const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v4: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky",
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz",
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  enum YesNo {
    YES
    NO
  }

  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: String!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    getAuthor(id:String):Author!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length, // Fixed: was books.length
    allBooks: (root, args) => {
      const { author, genre } = args;
      if (!author && !genre) return books;

      return books.filter(
        (book) =>
          (!author || book.author === author) &&
          (!genre || book.genres.includes(genre))
      );
    },
    allAuthors: () => {
      const bookCountByAuthor = books.reduce((acc, book) => {
        acc[book.author] = (acc[book.author] || 0) + 1;
        return acc;
      }, {});

      return authors.map((author) => ({
        ...author,
        bookCount: bookCountByAuthor[author.name] || 0,
      }));
    },
    getAuthor: (root, args) => {
      const { id } = args;
      const nAuthors = [...authors];
      const author = nAuthors.find((author) => author.id === id);

      const bookCountByAuthor = books.reduce((acc, book) => {
        acc[book.author] = (acc[book.author] || 0) + 1;
        return acc;
      }, {});
      return {
        ...author,
        bookCount: bookCountByAuthor[author.name] || 0,
      };
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);

      // Add author if they don't exist
      if (!authors.find((a) => a.name === args.author)) {
        authors = authors.concat({
          name: args.author,
          id: uuid(),
        });
      }

      return newBook;
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args;
      const author = authors.find((a) => a.name === name);
      if (!author) return null;

      const updatedAuthor = { ...author, born: setBornTo };
      authors = authors.map((a) => (a.name === name ? updatedAuthor : a));
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4001 },
})
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });

// const testAuthor = (id) => {
//   const nAuthors = [...authors];
//   const found = nAuthors.find((author) => author.id === id);
//   console.log(found);
// };

// testAuthor("afa51ab0-344d-11e9-a414-719c6709cf");
