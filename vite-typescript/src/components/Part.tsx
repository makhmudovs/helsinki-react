interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Group Projects: {coursePart.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
          <p>
            Background Material:{" "}
            <a href={coursePart.backgroundMaterial}>
              {coursePart.backgroundMaterial}
            </a>
          </p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
