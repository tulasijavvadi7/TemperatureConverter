document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('tempForm');
  const resultBox = document.getElementById('result');
  const cityDropdown = document.getElementById('city');
  const scaleDropdown = document.getElementById('inputScale');
  const tempInput = document.getElementById('temperatureInput');
  const compareDropdown = document.getElementById('compareCity');
  const compareBtn = document.getElementById('compareBtn');
  const compareContainer = document.getElementById('cityComparisonContainer');
  const compareResult = document.getElementById('compareResult');

  const cityTempMap = {
    "Chennai": 34,
    "Mumbai": 32,
    "Delhi": 30,
    "Kolkata": 31,
    "Bengaluru": 28,
    "Hyderabad": 33,
    "Ahmedabad": 35,
    "Jaipur": 29,
    "Pune": 30,
    "Lucknow": 31
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const scale = scaleDropdown.value;
    const city = cityDropdown.value;
    const tempValue = parseFloat(tempInput.value.trim());

    if (!city || !scale || isNaN(tempValue)) {
      resultBox.innerText = "Please enter valid inputs.";
      return;
    }

    let celsius;
    if (scale === "Celsius") celsius = tempValue;
    else if (scale === "Fahrenheit") celsius = (tempValue - 32) * 5 / 9;
    else if (scale === "Kelvin") celsius = tempValue - 273.15;

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    let caption = "";
    if (celsius < 15) caption = "It is so cold out there! ❄️ Bundle up in cozy sweaters with blanket on.";
    else if (celsius <= 26) caption = "Do not forget your umbrella ☔ unless you are planning a surprise shower.";
    else if (celsius <= 33) caption = "Today's forecast: 100% chance of daydreams and tan lines. 😎";
    else caption = "Don't forget your sunscreen ☀️ unless you are into fashionable sunburns.";

    resultBox.innerHTML =
      `<p>Celsius: ${celsius.toFixed(2)}°C, Fahrenheit: ${fahrenheit.toFixed(2)}°F, Kelvin: ${kelvin.toFixed(2)}K</p>
       <p>${caption}</p>`;

    window.baseCity = city;
    window.baseTemp = celsius;

    compareContainer.style.display = "block";
    compareResult.innerText = "";
  });

  form.addEventListener('reset', function () {
    resultBox.innerText = "Adjusted Temperature Will Be Displayed Here";
    compareResult.innerText = "";
    compareContainer.style.display = 'none';
  });

  compareBtn.addEventListener('click', function () {
    const compareCity = compareDropdown.value;

    if (!compareCity) {
      compareResult.innerText = "Please select a city to compare.";
      return;
    }

    if (compareCity === window.baseCity) {
      compareResult.innerText = "Please choose a city different from the original.";
      return;
    }

    const baseCityTemp = cityTempMap[window.baseCity];
    const targetCityTemp = cityTempMap[compareCity];

    if (!baseCityTemp || !targetCityTemp) {
      compareResult.innerText = "Temperature data not available.";
      return;
    }

    const adjusted = window.baseTemp - (baseCityTemp - targetCityTemp);
    compareResult.innerText = `If ${window.baseCity} is ${window.baseTemp.toFixed(2)}°C, then ${compareCity} will be approximately ${adjusted.toFixed(2)}°C.`;
  });
});
