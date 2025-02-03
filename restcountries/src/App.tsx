import React, { useEffect, useState } from "react";
import CountryService from "./services/CountryService";
import WeatherService from "./services/WeatherService";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [matchCountry, setMatchCountry] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    const regex = new RegExp(query, "i"); // "i" flag for case-insensitive matching
    const filtered = [...countries].filter((nC) =>
      regex.test(nC.name.official)
    );

    setMessage("");
    setCountryNames([]);
    setMatchCountry([]);
    if (filtered.length > 1 && filtered.length <= 10) {
      setCountryNames(filtered);
    } else if (filtered.length > 10) {
      setMessage("Too many matches, specify another filter");
      if (query.length === 0) {
        setMessage("");
      }
    } else if (filtered.length === 1) {
      setMatchCountry(filtered);
    }
  };

  const showSelectedCountry = (name: string) => {
    const regex = new RegExp(name, "i"); // "i" flag for case-insensitive matching
    const filtered = [...countries].filter((nC) =>
      regex.test(nC.name.official)
    );
    if (filtered.length >= 1) {
      setCountryNames([]);
      setMatchCountry([]);
      setMatchCountry(filtered);
    }
  };

  const renderResult = () => {
    if (countryNames.length) {
      return countryNames.map((cN, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          {cN["name"].common}{" "}
          <button onClick={() => showSelectedCountry(cN["name"].common)}>
            show
          </button>
        </div>
      ));
    } else if (matchCountry.length) {
      console.log("match country", matchCountry);
      const { name, area, capital, languages, flags,latlng } = matchCountry[0];
      const { common } = name;
      const languagesArray = Object.keys(languages).map((key) => [
        languages[key],
      ]);

      WeatherService.getWeather(latlng[0], latlng[1])
        .then((res) => {
          console.log("weather ", res);
        })
        .catch((err) => {
          console.error("weather error", err);
        });
      return (
        <div>
          <h1>{common}</h1>
          <div>
            <p>Capital: {capital[0]}</p>
            <p>Area: {area}</p>
          </div>
          <h3>Languages:</h3>
          <ul>
            {languagesArray.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
          <img src={flags.png} alt={common} />
        </div>
      );
    }
  };

  useEffect(() => {
    CountryService.getAll()
      .then((res) => {
        if (res.status === 200) {
          setCountries(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage(
          "Error occured please contact the developer or refresh your browser"
        );
        setTimeout(() => {
          setMessage("");
        }, 2000);
      });
  }, []);
  return (
    <div className="app">
      <h1>Find countries</h1>

      <div>
        <div>
          <label htmlFor="query" style={{ marginRight: "20px" }}>
            find countries
          </label>
          <input type="text" name="query" id="query" onChange={handleChange} />
        </div>
        <p>{message}</p>
      </div>
      {renderResult()}
    </div>
  );
};

export default App;
