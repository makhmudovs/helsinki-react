import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses/diagnoses";
import patientRouter from "./routes/patients/patients";
const app = express();

const allowedOrigins = ["http://localhost:5173"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
const PORT = 3001;

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
