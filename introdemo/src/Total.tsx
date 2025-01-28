import React from "react";

interface TotalItems {
  name: string;
  exercises: number;
}

interface TotalProps {
  parts: TotalItems[];
}

const Total: React.FC<TotalProps> = ({ parts }) => {
  return (
    <p>Number of exercises {parts.reduce((a, b) => a + b.exercises, 0)}</p>
  );
};

export default Total;
