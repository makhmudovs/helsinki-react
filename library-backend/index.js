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
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
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
type Authors{
     name: String!,
    id: String!,
    born: Int,
    bookCount:Int
}
type Books{
    title: String!,
    published: Int!,
    author: String!,
    id: String!,
    genres: [String!]!,
}


  type Query {
    bookCount:Int!
    authorCount:Int!
    allBooks(author:String,genre:String):[Books!]!
    allAuthors:[Authors!]!
  }

  type Mutation {
    addBook(
        title: String!,
        author: String!,
        published: Int!,
        genres: [String!]!
    ):Books
    editAuthor(
        name:String!
        setBornTo:Int!
    ):Authors
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => books.length,
    allBooks: (root, args) => {
      const { author, genre } = args;
      if (!author && !genre) {
        return books;
      }

      if (author) {
        return books.filter((book) => book.author === author);
      }
      if (genre) {
        console.log("genre", genre);
        const arr = [];
        books.forEach((book) => {
          if (book.genres.includes(genre)) {
            arr.push(book);
          }
        });
        return arr.length > 0 ? arr : books;
      }

      if (author && genre) {
        return books.map((book) => {
          if (book.genres.includes(genre) && book.author === author) {
            return book;
          }
        });
      }
    },
    allAuthors: () => {
      // First, create a count of books per author
      const bookCountByAuthor = books.reduce((acc, book) => {
        acc[book.author] = (acc[book.author] || 0) + 1;
        return acc;
      }, {});

      // Then, map through authors and add the bookCount property
      const updatedAuthors = authors.map((author) => ({
        ...author,
        bookCount: bookCountByAuthor[author.name] || 0,
      }));

      return updatedAuthors;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);
      return newBook;
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args;

      const author = authors.find((author) => author.name === name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: setBornTo };
      authors = authors.map((author) =>
        author.name === name ? updatedAuthor : author
      );

      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
