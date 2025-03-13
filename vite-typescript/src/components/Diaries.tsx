import React from "react";
import { DiaryEntry } from "../types";

interface DiariesProps {
  diaries: DiaryEntry[];
}

const Diaries: React.FC<DiariesProps> = ({ diaries }) => {
  return (
    <div>
      {diaries.length > 0 ? (
        diaries.map((diary) => (
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <p>
              Visibility: <strong>{diary.visibility}</strong>
            </p>
            <p>
              Weather: <strong>{diary.weather}</strong>
            </p>
          </div>
        ))
      ) : (
        <div>Nothing to show</div>
      )}
    </div>
  );
};

export default Diaries;
