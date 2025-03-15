import patients from "../../patients";
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
  EntryWithoutId,
} from "../types";

import { v4 as uuidv4 } from "uuid";

const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getPatient = (id: string) => {
  const nPatients = [...patients];
  return nPatients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatient = {
    ...patient,
    id: uuidv4(),
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntryForPatient = (id: string, object: EntryWithoutId) => {
  const nPatients = [...patients];
  const patientIndex = nPatients.findIndex((p) => p.id === id);
  const patient = nPatients.find((p) => p.id === id);
  
  if (patient) {
    if (!patient.entries) {
      patient.entries = []; // Initialize if undefined
    }

    const newEntry = { ...object, id: uuidv4() };
    patient.entries.push(newEntry); // ✅ Safe push operation

    // Update the patient array
    nPatients[patientIndex] = patient;
  } else {
    throw new Error("Error occurred: Check patient ID");
  }

  return { index: patientIndex, patient, body: object };

};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntryForPatient,
};
