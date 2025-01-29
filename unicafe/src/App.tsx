import { useState } from "react";
import Button from "./components/button/Button";
import Stats from "./components/stats/Stats";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h3>Statistics</h3>
      <Stats good={good} neutral={neutral} bad={bad}/>
      <p>All {good + neutral + bad}</p>
    </>
  );
};

export default App;
