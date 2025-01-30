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
    <p style={{fontWeight:'bold'}}>Total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</p>
  );
};

export default Total;
