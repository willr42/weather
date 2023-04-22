const API_KEY = "3hy5Wxy+klw7GLIKtDR1Jg==PIKW41SCjApWtOLR";

if ("geolocation" in navigator) {
  const localError = document.querySelector("#localError");
  localError.classList.toggle("flex");
  localError.classList.toggle("hidden");

  navigator.geolocation.getCurrentPosition(
    handleLocationSuccess,
    handleLocationError
  );
}

async function handleLocationSuccess(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;
  const closestCityUrl = `https://api.api-ninjas.com/v1/reversegeocoding?lat=${userLat}&lon=${userLon}`;
  const closestCity = await fetchClosestCity(closestCityUrl);
  const currentWeather = await fetchCityWeather(closestCity.name);
  updateDOM("local", closestCity.name, currentWeather);
}

async function fetchCityWeather(cityName) {
  const cityNameUrl = `https://api.api-ninjas.com/v1/weather?city=${cityName}`;
  try {
    const response = await fetch(cityNameUrl, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    if (response.status !== 200) {
      console.error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchClosestCity(closestCityUrl) {
  try {
    const response = await fetch(closestCityUrl, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    if (response.status !== 200) {
      console.error(response.status);
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(error);
  }
}

function handleLocationError(error) {
  const localError = document.querySelector("#localError");
  localError.classList.toggle("flex");
  localError.classList.toggle("hidden");
}

function updateDOM(category, city, currentWeather) {
  let name;
  let emoji;
  let temperatureElement;
  if (category === "local") {
    name = document.querySelector("#localCity");
    emoji = document.querySelector("#localEmoji");
    temperatureElement = document.querySelector("#localTemp");
  } else {
    name = document.querySelector("#searchCity");
    emoji = document.querySelector("#searchEmoji");
    temperatureElement = document.querySelector("#searchTemp");
  }
  const temperature = currentWeather.temp;

  name.textContent = city;
  emoji.innerHTML = checkEmoji(parseInt(temperature));
  temperatureElement.textContent = temperature;
}

function checkEmoji(temperature) {
  const EMOJIS = {
    hot: "&#9728;&#65039;",
    cold: "&#9748;",
    medium: "&#127781;",
  };

  if (temperature < 17) {
    return EMOJIS.cold;
  } else if (temperature < 27) {
    return EMOJIS.medium;
  } else {
    return EMOJIS.hot;
  }
}

const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const cityName = formData.get("city");
  if (cityName) {
    fetchCityWeather(cityName)
      .then((data) => {
        updateDOM("search", cityName, data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
