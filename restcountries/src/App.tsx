import React, { useState } from "react";
import axios from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");

  const handleFindCountry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() !== "") {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${query}`)
        .then((res) => {
          console.log("response ", res);
          setMessage("Country found");
          setColor("green");
          setTimeout(() => {
            setMessage("");
            setColor("green");
          }, 2500);
        })
        .catch((err) => {
          console.error("err ", err);
          setMessage("Country not found");
          setColor("red");
          setTimeout(() => {
            setMessage("");
            setColor("green");
          }, 2500);
        });
    }
  };
  return (
    <>
      <h1>Find countries</h1>
      <Notification message={message} color={color} />
      <div style={{ padding: "2rem" }}>
        <form onSubmit={handleFindCountry}>
          <label htmlFor="query" style={{ marginRight: "20px" }}>
            find countries
          </label>
          <input
            type="text"
            name="query"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Find</button>
        </form>
      </div>
    </>
  );
};

export default App;
