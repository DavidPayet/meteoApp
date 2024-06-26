const title = document.querySelector('.title')
const weatherDescription = document.querySelector('.weather-description')
const temperature = document.querySelector('.temperature')
const imgIcone = document.querySelector('.meteo-icon')
const feelsLike = document.querySelector('.ticker-content :nth-child(1)')
const tempMin = document.querySelector('.ticker-content :nth-child(2)')
const tempMax = document.querySelector('.ticker-content :nth-child(3)')
const pressure = document.querySelector('.ticker-content :nth-child(4)')
const humidity = document.querySelector('.ticker-content :nth-child(5)')
const APIKEY = API_KEY

const fetchWeather = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      weatherDescription.innerText = data.weather[0].description
      temperature.innerText = `${Math.trunc(data.main.temp)}°`
      title.innerText = data.name
      feelsLike.innerText = `Ressentie: ${Math.trunc(data.main.feels_like)}°`
      tempMin.innerText = `Min: ${Math.trunc(data.main.temp_min)}°`
      tempMax.innerText = `Max: ${Math.trunc(data.main.temp_max)}°`
      humidity.innerText = `Humidité: ${data.main.humidity}%`
      pressure.innerText = `Pression: ${data.main.pressure} hPa`

      let currentHour = new Date().getHours()

      if (currentHour >= 6 && currentHour < 21) {
        imgIcone.src = `assets/day/${data.weather[0].icon}.svg`
      } else {
        imgIcone.src = `assets/night/${data.weather[0].icon}.svg`
      }
    })
}

const fetchCity = () => {
  fetch('/conf.json')
    .then((res) => res.json())
    .then((data) => {
      let city = data[0].name
      fetchWeather(city)
    })
}

const updateWeatherHourly = () => {
  fetchCity()

  setInterval(() => {
    fetchCity()
  }, 1000 * 60 * 60)
}
updateWeatherHourly()
