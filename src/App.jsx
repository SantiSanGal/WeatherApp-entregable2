import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const succes = pos => {

      const obj = {
        lat: pos.coords.latitude,
        log: pos.coords.longitude
      }

      setCoords(obj)
    }

    navigator.geolocation.getCurrentPosition(succes)
  }, [])

  useEffect(() => {
    if (coords) {
      const APIKey = 'd36533947ee66ce38f41d1d772f58ec3'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.log}&appid=${APIKey}`

      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
          }
          setTemperature(obj)
        })
        .catch(err => console.log(err))
        .finally(()=> setIsLoading(false))
    }
  }, [coords])
  //para que se ejecute después de que llegue la información de coords


  // console.log(coords);
  //coordenadas
  // console.log(weather);
  //información de la API, según mi ubicación

  return (
    <div className="App">
      {
        isLoading ?
          <h1>Loading...</h1>
        :
          <WeatherCard weather={weather} temperature={temperature}/>
      } 
    </div>
  )
}

export default App
