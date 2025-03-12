import patients from "../../patients";
import { NonSensitivePatientEntry } from "../types";

const getPatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

export default {
  getPatients,
};
