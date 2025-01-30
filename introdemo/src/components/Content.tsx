import React from "react";
import Part from "./Part";

interface DataItems {
  name: string;
  exercises: number;
}
interface ContentProps {
  data: DataItems[];
}

const Content: React.FC<ContentProps> = ({ data }) => {
  return (
    <div>
      {data.map((d, i) => (
        <Part key={i} part={d.name} exercise={d.exercises} />
      ))}
    </div>
  );
};

export default Content;
