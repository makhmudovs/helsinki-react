import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Author from "./pages/Author";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
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
