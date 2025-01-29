import React from "react";

interface StatsItems {
  good: number;
  neutral: number;
  bad: number;
}

const Stats: React.FC<StatsItems> = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
      <thead>
        <th>Feedback</th>
        <th>Count</th>
      </thead>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{(good + bad + neutral / 3).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{(good + bad + neutral / 3).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Stats;
