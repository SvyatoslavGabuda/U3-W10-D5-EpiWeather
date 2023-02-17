import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import TodayWeater from "./TodayWeater";
import WeekWeater from "./WeekWeater";
// const call5day = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
const WeatherFetch = () => {
  const city = useSelector((state) => state.city);
  const country = useSelector((state) => state.country);
  const [meteoToday, setMeteoToday] = useState(null);
  const [fiveDayMeteo, setFiveDayMeteo] = useState(null);
  const [lat, setLat] = useState(45.6944947);
  const [lon, setLon] = useState(9.6698727);

  const fetchMeteo = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=96b5e7127c7d577f64d2826b0fa80050`
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setMeteoToday(data);
      } else {
        console.log("qualcosa è andato storto");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFiveDayMeteo = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=96b5e7127c7d577f64d2826b0fa80050`
      );
      if (response.ok) {
        const data = await response.json();
        // console.log("5day", data);
        // console.log(data.list);
        setFiveDayMeteo(data.list);
      } else {
        console.log("qualcosa è andato storto");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCoordinates = async () => {
    try {
      const response = await fetch(
        ` http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=96b5e7127c7d577f64d2826b0fa80050 `
      );
      if (response.ok) {
        const data = await response.json();
        // console.log("coordinate", data);
        // console.log(data[0].lat);
        setLat(data[0].lat);
        setLon(data[0].lon);
      } else {
        console.log("errore");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //console.log("latelon", lat, lon);
    fetchMeteo();
    fetchFiveDayMeteo();
  }, []);
  useEffect(() => {
    // console.log("valore iniziale", city, country);
    // console.log(" int lat e lon", lat, lon);
    if (city !== "" && country !== "") {
      fetchCoordinates();
    }
  }, [city, country]);
  useEffect(() => {
    fetchMeteo();
    fetchFiveDayMeteo();
  }, [lat, lon]);
  return (
    <>
      {meteoToday && (
        <h2 className="mt-2">
          Weather at: <span>{meteoToday.name}</span> - {new Date().toLocaleDateString()}
        </h2>
      )}
      <Row className="mt-4 row-cols-1 row-cols-md-2">
        <Col>{meteoToday && <TodayWeater meteo={meteoToday} />}</Col>
        <Col>{fiveDayMeteo && <WeekWeater fiveMeteo={fiveDayMeteo} />}</Col>
      </Row>
    </>
  );
};
export default WeatherFetch;
