import './App.css'
import Search from './components/search/search'
import CurrentWeather from './components/Current-Weather/current-weather'
import { WEATHER_API_URL, WEATHER_API_KEY } from './api'
import { useState } from 'react'
import Forecast from './components/Forecast/forecast'

function App() {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ')

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherRespose = await response[0].json()
        const forecastRespose = await response[1].json()
        setCurrentWeather({ city: searchData.label, ...weatherRespose })
        setForecast({ city: searchData.label, ...forecastRespose })
      })
      .catch((err) => { console.log(err) })
  }

  console.log(currentWeather)
  console.log(forecast)


  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather}></CurrentWeather>}
      {forecast && <Forecast data={forecast}></Forecast>}
    </div>
  )
}

export default App
