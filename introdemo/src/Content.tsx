import React from "react";
import Part from "./Part";

interface DataItem {
  part: string;
  exercise: number;
}
interface ContentProps {
  data: DataItem[];
}

const Content: React.FC<ContentProps> = ({ data }) => {
  return (
    <>
      {data.map((d, index) => (
        <Part key={index} part={d.part} exercise={d.exercise}/>
      ))}
    </>
  );
};

export default Content;
