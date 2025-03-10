import express, { Request, Response } from "express";
const app = express();
import { bmiCalculator } from "./bmiCalculator";
import { calculator, Operation } from "./calculator";
import { exerciseCalculator } from "./exerciseCalculator";

app.use(express.json());

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target || isNaN(Number(target))) {
    res.status(400).send({ error: "Parameters missing" });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  daily_exercises.map((r: any) => {
    if (isNaN(Number(r))) {
      throw new Error("malformatted parameters");
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = exerciseCalculator(daily_exercises, target);
  res.send({ result });
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;
  if (!value1 || isNaN(Number(value1)) || !value2 || isNaN(Number(value2))) {
    res.status(400).send({ error: "..." });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(value1, value2, op as Operation);
  res.send({ result });
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req: Request, res: Response) => {
  const weight = req.query.weight;
  const height = req.query.height;
  const parsedWeight = Number(weight);
  const parsedHeight = Number(height);

  if (
    !weight ||
    !height ||
    isNaN(parsedWeight) ||
    isNaN(parsedHeight) ||
    parsedWeight <= 0 ||
    parsedHeight <= 0
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const bmi = bmiCalculator(parsedHeight, parsedWeight);
  res.send({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
