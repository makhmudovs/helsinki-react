import { useState, useEffect } from "react";
import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";
import diaryService from "./services/diaries";
import Diaries from "./components/Diaries";
import NewDiaryForm from "./components/NewDiaryForm";

const App = () => {
  const [diaries, setDiary] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>();
  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiary(diaries);
    };
    void fetchDiaryList();
  }, []);

  const submitNewDiary = async (values: NewDiaryEntry) => {
    try {
      const diary = await diaryService.create(values);
      setDiary(diaries.concat(diary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          console.error("Unrecognized axios error");
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  return (
    <div>
      {error && (
        <div style={{ border: "1px solid red", padding: "1rem" }}>{error}</div>
      )}
      <h1>home</h1>
      <NewDiaryForm onSubmit={submitNewDiary} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
