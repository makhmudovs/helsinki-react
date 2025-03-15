import express, { Response, Request, NextFunction } from "express";
import { z } from "zod";
import patientService from "../../services/patientService";
import {
  NewEntryForPatient,
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../../types";
import { newEntryForPatientSchema, newPatientSchema } from "../../utils";

const router = express.Router();

router.get("/", (_req: Request, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req: Request, res: Response) => {
  res.send(patientService.getPatient(req.params.id));
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
    newPatientSchema.parse(req.body);
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

const newPatientEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newEntryForPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/:id/entries",
  newPatientEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntryForPatient>,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      // Validate request body with Zod
      const parsedEntry = newEntryForPatientSchema.parse(req.body);

      // Add validated entry to the patient
      const addedEntryForPatient = patientService.addEntryForPatient(
        id,
        parsedEntry
      );

      res.json(addedEntryForPatient);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.issues });
      } else if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
);

router.use(errorMiddleware);

export default router;
