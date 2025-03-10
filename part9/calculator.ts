

type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) throw new Error("Cant\t divide by 0!");
      return a / b;
    default:
      throw new Error("Operation is not multiply divide or add!");
  }
};

try {
  const a = Number(process.argv[2]);
  const b = Number(process.argv[3]);
  const op = String(process.argv[4]);
  console.log(calculator(a, b, op));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
