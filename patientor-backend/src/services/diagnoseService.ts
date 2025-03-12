import diagnoses from "../../diagnoses";
import { DiagnoseEntry } from "../types";

const getDiagnoses = (): DiagnoseEntry[] => {
  console.log('we are here');
  console.log(diagnoses);
  return diagnoses;
};

export default {
  getDiagnoses,
};
