interface BmiValues {
  height: number;
  weight: number;
}
const parseBmi = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not numbers");
  }
};

const bmiCalculator = (height: number, weight: number): string => {
  const res = (height / 100) * (height / 100);
  const bmi = Math.round(weight / Number(res.toFixed(2)));
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 18.5 && bmi < 24.9) {
    return "Normal weight";
  } else if (bmi > 24.9 && bmi < 29.9) {
    return "Overweight";
  } else if (bmi >= 30) {
    return "Obesity";
  }
};

try {
  const { height, weight } = parseBmi(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error:  " + error.message;
  }
  console.log(errorMessage);
}
