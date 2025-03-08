const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
require("dotenv").config();

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { author, genre } = args;
      let query = {};
      if (author) {
        const authorDoc = await Author.findOne({ name: author });
        if (!authorDoc) return [];
        query.author = authorDoc._id;
      }
      if (genre) query.genres = { $in: [genre] }; // Only apply filter if genre is provided
      const books = await Book.find(query).populate("author");
      return books.filter((book) => book.author && book.author.name);
      //need to add bookcount here too
    },
    allAuthors: async () => {
      const books = await Book.find({}).populate("author");
      const bookCountByAuthor = books.reduce((acc, book) => {
        const authorId = book.author?._id.toString();
        acc[authorId] = (acc[authorId] || 0) + 1;
        return acc;
      }, {});
      const authors = await Author.find({});
      return authors.map((author) => ({
        id: author._id.toString(),
        name: author.name,
        born: author.born || null,
        bookCount: bookCountByAuthor[author._id.toString()] || 0,
      }));
    },
    getAuthor: async (root, { id }) => {
      const author = await Author.findById(id);
      if (!author)
        throw new GraphQLError("Author not found", {
          extensions: { code: "NOT_FOUND" },
        });
      const bookCount = await Book.countDocuments({ author: author._id });
      return {
        id: author._id.toString(),
        name: author.name,
        born: author.born,
        bookCount,
      };
    },
    me: (_, __, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { title, author: authorName, published, genres } = args;
      let author = await Author.findOne({ name: authorName });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      if (!author) {
        author = new Author({ name: authorName });
        await author.save();
      }
      const newBook = new Book({
        title,
        published,
        author: author._id,
        genres,
      });
      try {
        await newBook.save();
      } catch (error) {
        throw new GraphQLError("Saving new book failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
        });
      }
      await newBook.populate("author");
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
      return newBook;
    },
    addAuthor: async (root, args) => {
      const newAuthor = new Author({ ...args });
      try {
        await newAuthor.save();
      } catch (error) {
        throw new GraphQLError("Saving new author failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
        });
      }
      return newAuthor;
    },
    editAuthor: async (root, args, context) => {
      const { name, setBornTo } = args;
      const currentUser = context.currentUser;
      const author = await Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      );

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      if (!author)
        throw new GraphQLError("Author not found", {
          extensions: { code: "NOT_FOUND" },
        });
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
