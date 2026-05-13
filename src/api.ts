import { WeatherSchema } from './schemas/weatherSchema'
import { LocationSchema } from './schemas/locationSchema.ts'

const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`
  )
  const data = await res.json()
  console.log(data)
  return WeatherSchema.parse(data)
}

export async function getCoords(city: string) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
  )
  const data = await res.json()
  return LocationSchema.parse(data)
}
