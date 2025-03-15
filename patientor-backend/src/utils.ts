import { z } from "zod";
import { EntryType, Gender, HealthRating, NewPatientEntry } from "./types";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  // entries: z.array(z.string()),
});


export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};



// Base schema for all entries
const baseEntrySchema = z.object({
  date: z.string(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

// Hospital Entry Schema
const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

// OccupationalHealthcare Entry Schema
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

// HealthCheck Entry Schema
const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthRating),
});

// Define Discriminated Union Schema
export const newEntryForPatientSchema = z.discriminatedUnion("type", [
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
  healthCheckEntrySchema,
]);