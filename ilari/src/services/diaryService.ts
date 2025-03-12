import diaries from "../../entries";
import { NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    ...entry,
    id: Math.max(...diaries.map((d) => d.id)) + 1,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};
export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
