import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

interface PartItems {
  name: string;
  exercises: number;
  id: number;
}

interface CourseItems {
  id: number;
  name: string;
  parts: PartItems[];
}

interface CourseProps {
  courses: CourseItems[];
}

const Course: React.FC<CourseProps> = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content data={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
