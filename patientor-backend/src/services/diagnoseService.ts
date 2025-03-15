import diagnoses from "../../diagnoses";
import { DiagnoseEntry } from "../types";

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
