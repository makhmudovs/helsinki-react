interface ExerValues {
  target: number;
  args: Array<number>;
}

const parseArgs = (args: string[]): ExerValues => {
  const restItems = args.slice(2);
  restItems.map((r) => {
    if (isNaN(Number(r))) {
      throw new Error("Provided values were not numbers");
    }
  });

  return { target: Number(args[2]), args: args.slice(3).map((r) => Number(r)) };
};

interface CalculatorTypes {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (
  hours: Array<number>,
  target: number
): CalculatorTypes => {
  if (hours.length === 0) throw new Error("Empty array is given");

  let rating = 0;
  let ratingDescription = "Bad";
  const hoursTotal = hours.reduce((a, b) => a + b, 0);

  if (hoursTotal > 10) {
    rating = 2;
    ratingDescription = "Ok";
  } else if (hoursTotal > 20) {
    rating = 3;
    ratingDescription = "Good";
  } else if (hoursTotal > 30) {
    rating = 4;
    ratingDescription = "Great";
  } else if (hoursTotal > 40) {
    rating = 5;
    ratingDescription = "Excellent";
  } else {
    rating = 1;
    ratingDescription = "Bad";
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h !== 0).length,
    success: hours.filter((h) => h !== 0).length > target,
    rating,
    ratingDescription,
    target,
    average: hours.reduce((a, b) => a + b, 0) / hours.length,
  };
};

try {
  const { target, args } = parseArgs(process.argv);
  console.log(exerciseCalculator(args, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
