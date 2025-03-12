import express, { Response, Request, NextFunction } from "express";
import { z } from "zod";
import patientService from "../../services/patientService";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../../types";
import { newEntrySchema } from "../../utils";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getPatients());
});

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>
  ) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.use(errorMiddleware);

export default router;
