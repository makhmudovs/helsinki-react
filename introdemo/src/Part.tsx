import React from "react";

interface PartProps {
  part: string;
  exercise: number;
}

const Part: React.FC<PartProps> = ({ part, exercise }) => {
    console.log(part)
    console.log(exercise)
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

export default Part;
