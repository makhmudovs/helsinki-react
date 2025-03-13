import Part, { CoursePart } from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <Part key={index} coursePart={part} />
      ))}
    </>
  );
};

export default Content;
