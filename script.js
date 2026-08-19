async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const loadingMessage = document.getElementById("loadingMessage");

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        errorMessage.style.display = "block";
        return;
    }

    errorMessage.style.display = "none";
    loadingMessage.style.display = "block";

    try {

        const response = await fetch(
            `/api/weather?city=${encodeURIComponent(city)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "City not found");
        }

        loadingMessage.style.display = "none";

        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("windSpeed").textContent =
            `${data.wind.speed} m/s`;

        document.getElementById("feelsLike").textContent =
            `${Math.round(data.main.feels_like)}°C`;

        const weather = data.weather[0].main;

        let icon = "🌤️";

        if (weather === "Clear") {
            icon = "☀️";
        } else if (weather === "Clouds") {
            icon = "☁️";
        } else if (weather === "Rain") {
            icon = "🌧️";
        } else if (weather === "Drizzle") {
            icon = "🌦️";
        } else if (weather === "Thunderstorm") {
            icon = "⛈️";
        } else if (weather === "Snow") {
            icon = "❄️";
        } else if (weather === "Mist" || weather === "Fog") {
            icon = "🌫️";
        }

        document.getElementById("weatherIcon").textContent = icon;

    } catch (error) {

        loadingMessage.style.display = "none";

        errorMessage.textContent =
            "City not found. Please enter a valid city name.";

        errorMessage.style.display = "block";
    }
}
