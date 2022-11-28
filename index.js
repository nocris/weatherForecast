//************** API KEYS ***************//
const keyGeo = 'ae3085138e154e39874f713994539485';
const keyWeather = '3c8d1d744cbc43d84c84fafca9e14ffa';
// https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${keyWeather}

/***** take the input city and submit */
function printCity() {
    document.addEventListener('DOMContentLoaded', () => {
        let searchButton = document.querySelector('#search-city');
        searchButton.addEventListener('click', () => {
            let cityInput = document.querySelector('#city-input').value
            // console.log(cityInput);

            //************** API LOCATION ***************//
            async function getDataFromOCD(ville) {
                let urlLocation = `https://api.opencagedata.com/geocode/v1/json?q=${ville}&key=${keyGeo}&language=it&pretty=1`
                try {
                    const res = await fetch(urlLocation);
                    const data = await res.json();
                    const lat = data.results[0].geometry.lat;
                    const lon = data.results[0].geometry.lng;
                    // console.log(lat, lon);
                    getDataFromOWM(lat, lon);
                } catch (error) {
                    console.log(error);
                }
            }
            getDataFromOCD(cityInput);
        })
    })
}

//************** API METEO ***************//
function getDataFromOWM(latitude, longitude) {
    let urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${keyWeather}`;
    return fetch(urlWeather)
        .then(res => res.json())
        .then(data => {
            let i = 4;
            document.getElementById("day").innerHTML = ""; // reset inner HTML

            for (let index = 0; index < i; index++) {
                const weatherNow = data.daily[index].weather[0].main;
                let test = document.getElementById("weather")
                const day = new Date().getDay(); // day today in number
                document.getElementById("day").innerHTML += `                    
                    <p>${getDayOfTheWeek(day + index)}</p>                 
                    <img src="${switchImages(weatherNow)}" alt="${switchImages(weatherNow)}" />
                    `
                console.log(switchImages(weatherNow))

            }

        })
     .catch(error => console.log(error))
}
function switchImages(variable) {
    let icon
    
    switch (variable) {
        case 'Clear':
            return icon = "./images/sun.svg"
            break;
        case 'Clouds':
            return icon = "./images/clouds.svg";
            break;
        case 'Cloudy':
            return icon = "./images/cloudy.svg";
            break;
        case 'Rain':
            return icon = "./images/rain.svg";
            break;
        case 'Snow':
            return icon = "./images/snow.svg";
            break;
        default:
            break;
    }
}
function getDayOfTheWeek(day) {
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const today = week[day];
    return today;
}



printCity();

