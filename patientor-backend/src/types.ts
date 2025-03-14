import { z } from "zod";
import { newEntrySchema } from "./utils";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  diagnosisCodes?: string[];
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  diagnosisCodes?: string[];
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: 0 | 1 | 2 | 3;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export type NewPatientEntry = z.infer<typeof newEntrySchema>;

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;