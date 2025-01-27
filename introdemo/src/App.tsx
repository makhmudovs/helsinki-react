const Hello = ({ name, age }: { name: string; age: number }) => {
  return (
    <>
      <p>
        Hello {name}, you are {age} yearls old.
      </p>
    </>
  );
};
const App = () => {
  const name = "Peter";
  const age = 10;
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </>
  );
};

export default App;
