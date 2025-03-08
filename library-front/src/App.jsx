import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Author from "./pages/Author";
import { useState } from "react";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null);

  // const client = ApolloClient();
  if (!token) {
    return <LoginForm token={token} setToken={setToken} />;
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar setToken={setToken} />
      <div className="max-w-screen-xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/author/:id" element={<Author />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
