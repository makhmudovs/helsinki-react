import React from "react";

interface PartProps {
  part: string;
  exercise: number;
}

const Part: React.FC<PartProps> = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

export default Part;
