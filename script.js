const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const cityName = document.querySelector('.cityName');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const locationNotFound = document.querySelector('.location-not-found');

const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {

    const api_key = "d45ec4259a88a13b16f5aa62ff69ba77";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(res => res.json());
    const condition = weather_data.weather[0].main;
    console.log(weather_data);

    if (weather_data.cod === 404 || weather_data.cod !== 200) {
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        // console.log("error");
        return;
    }
    // console.log(weather_data);

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    cityName.innerHTML = `${weather_data.name}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    windSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;

    const imgSrc = "images";
    switch(condition) {
        case 'Clouds':
            weatherImg.src = `${imgSrc}/cloudy.png`;
            break;
        case 'Clear':
            weatherImg.src = `${imgSrc}/clear.png`;
            break;
        case 'Rain':
        case 'Drizzle':
            weatherImg.src = `${imgSrc}/rain.png`;
            break;
        case 'Haze':
        case 'Fog':
        case 'Smoke':
        case 'Dust':
        case 'Sand':
        case 'Ash':
        case 'Squall':
        case 'Mist':
            weatherImg.src = `${imgSrc}/mist.png`;
            break;
        case 'Snow':
            weatherImg.src = `${imgSrc}/snow.png`;
            break;
        case 'Tornado':
            weatherImg.src = `${imgSrc}/thunder.png`;
    }

    // console.log(weather_data);
}
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
})
