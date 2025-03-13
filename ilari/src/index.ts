import express from "express";
import cors from 'cors';
import diaryRouter from "./routes/diaries";
const app = express();

const allowedOrigins = ["http://localhost:5173"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());


const PORT = 3000;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
