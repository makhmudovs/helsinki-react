import express, { Request, Response } from "express";
const app = express();
import { bmiCalculator } from "./bmiCalculator";

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
