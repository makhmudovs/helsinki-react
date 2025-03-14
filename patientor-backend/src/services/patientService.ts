import patients from '../../patients';
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
} from "../types";

import { v4 as uuidv4 } from 'uuid';

const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getPatient = (id:string)=> {
  const nPatients = [...patients];
  return nPatients.find(p => p.id === id);
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatient = {
    ...patient,
    id: uuidv4(),
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getPatient
};
