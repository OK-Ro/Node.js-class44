import express from "express";
import { API_KEY } from "./sources/keys.js";
import fetch from "node-fetch";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});



app.post('/weather', async (req, res) => {
  const { cityName } = req.body;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      const cityName = data.name;
      const temperature = data.main.temp;
      const weatherText = `Temperature in ${cityName}: is now ${temperature}°C`;
      res.json({ weatherText });
    } else if (response.status === 404) {
      res.status(404).json({ weatherText: `${cityName} City is not found!` });
    } else {
      res.status(500).json({ weatherText: "Internal Server Error" });
    }
  } catch (error) {
    res.status(500).json({ weatherText: "Internal Server Error" });
  }
});
export default app;