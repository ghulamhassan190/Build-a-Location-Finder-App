const output = document.getElementById("output");

document.querySelector("button").addEventListener("click", getLocation);

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function (sucess) {
      const { coords } = sucess;
      const { latitude, longitude } = coords;
      countryNameFoo(latitude, longitude);
    },
    function (error) {
      // output.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  );
}

function countryNameFoo(lat, long) {

  fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=379088381190719502347x102690 `)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      const { country } = data;

      countryDetailsName(country);
    });
}

function countryDetailsName(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(res => res.json())
    .then(data => {
      const country = data[0];
output.innerHTML += `
  <div class="country-card">
    <h3>Country Details</h3>
    <p><strong>Name:</strong> ${country.name.common}</p>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population}</p>
    <img src="${country.flags.png}" width="100"/>
  </div>
`;
    });
}