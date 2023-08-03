const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const weatherInfo = document.getElementById("weather-info");

searchButton.addEventListener("click", () => {
  const city = searchInput.value;
  if (city.trim() === "") {
    alert("Please enter a city name.");
    return;
  }

  fetchWeatherData(city);
});

function fetchWeatherData(city) {
  const apiKey = "570b73210bd8e5fbb15c2c8390f0a564";
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherDescription = data.weather[0].description.toUpperCase();
      const temperature = data.main.temp; 
      const humidity = data.main.humidity;

      const weatherHTML = `
        <h2>${city}</h2>
        <img class="image" src="images/${data.weather[0].main.toLowerCase()}.png"/>
        <p>${weatherDescription}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
      `;

      weatherInfo.innerHTML = weatherHTML;
    })
    .catch((error) => {
      alert("Error fetching weather data. Please try again later.");
      console.error(error);
    });
}
