import express, { Response, Request } from "express";
import patientService from "../../services/patientService";
import { NonSensitivePatientEntry } from "../../types";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getPatients());
});

export default router;
