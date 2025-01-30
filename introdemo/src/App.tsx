import Course from "./Course";

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return <div>the app is used by pressing the button</div>;
//   }

//   return <div>button press history {props.allClicks.join(" ")}</div>;
// };

// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClick, setAll] = useState([]);
//   const [total, setTotal] = useState(0);

//   const handleLeftClick = () => {
//     setAll(allClick.concat("L"));
//     setLeft(left + 1);
//     const updatedLeft = left + 1;
//     setTotal(updatedLeft + right);
//   };
//   const handleRightClick = () => {
//     setAll(allClick.concat("R"));
//     setRight(right + 1);
//     const updatedRight = right + 1;
//     setTotal(updatedRight + left);
//   };
//   return (
//     <div style={{ padding: "10px" }}>
//       {left}
//       <Button onClick={handleLeftClick} text="left" />
//       <Button onClick={handleRightClick} text="right" />
//       {right}
//       <br />
//       <History allClicks={allClick} />
//       <p>Total: {total}</p>
//     </div>
//   );
// };

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <Course courses={courses} />
    </>
  );
};

export default App;
