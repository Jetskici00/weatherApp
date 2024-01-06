const apiKey = "8fe84a816ae377c5c9a8f297601aac71";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

async function checkWeather(city = "") {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    errorElement.style.display = "block";
    weatherElement.style.display = "none";
  } else {
    const data = await response.json();

    cityElement.textContent = data.name;
    tempElement.textContent = Math.round(data.main.temp) + "°c";
    humidityElement.textContent = data.main.humidity + "%";
    windElement.textContent = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        // Добавьте обработку для других видов погоды
        break;
    }

    weatherElement.style.display = "block";
    errorElement.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const searchTerm = searchBox.value.trim();
  if (searchTerm !== "") {
    checkWeather(searchTerm);
  }
});

// Вызов checkWeather без аргументов не имеет смысла, так что убрал эту строку
