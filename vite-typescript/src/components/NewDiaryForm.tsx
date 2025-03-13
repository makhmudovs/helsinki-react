import { ChangeEvent, SyntheticEvent, useState } from "react";
import { NewDiaryEntry, Weather, Visibility } from "../types";
interface Props {
  onSubmit: (values: NewDiaryEntry) => void;
}

interface VisibilityOption {
  value: Visibility;
  label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

interface WeatherOption {
  value: Weather;
  label: string;
}

const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));

const NewDiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [comment, setComment] = useState("");

  const onWeatherChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const weather = Object.values(Weather).find(
        (w) => w.toString() === value
      );
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const onVisibilityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(
        (v) => v.toString() === value
      );
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const addDiary = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!date) {
      alert("Please enter a date.");
      return;
    }
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      alert("Please enter a valid date in the format YYYY-MM-DD.");
      return;
    }

    onSubmit({
      date,
      weather,
      visibility,
      comment,
    });

    setDate("");
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment("");
  };
  return (
    <div>
      <h3>Add new</h3>
      <form onSubmit={addDiary}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
            type="text"
            name="date"
            id="date"
          />
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          <select
            name="weather"
            id="weather"
            value={weather}
            onChange={onWeatherChange}
          >
            {weatherOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <select
            name="visibility"
            id="visibility"
            value={visibility}
            onChange={onVisibilityChange}
          >
            {visibilityOptions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            name="comment"
            id="comment"
          >
            Your comment here
          </textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
