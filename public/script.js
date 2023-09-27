console.log("Script.js Loaded");

let getInput = () => {
    let city = document.querySelector("#city").value;
    let unit = document.querySelector("#unit").value;
    return {city: city, unit: unit};
}

async function getWeatherInfo() {
    let input = getInput();
    console.log(input.city, input.unit);
    const response = await fetch(`/weatherinfo/${input.city}/${input.unit}`);
    const data =  await  response.json();
    console.log(data);
    return data;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#getInfo").addEventListener('click', async () => {
       let info = await getWeatherInfo();
       let iconId = info.weather[0].icon
       if ( document.querySelector("#weatherIcon") !== null) {
        document.querySelector("#weatherIcon").remove();
       }
       let img = document.createElement('img');
       img.className = "img img-fluid"
       img.id = "weatherIcon";
       img.src = `http://openweathermap.org/img/w/${iconId}.png`;
       document.querySelector("#weather-container").appendChild(img);
       
       let temp = Math.floor(info.main.temp);
       let weather = info.weather[0].main;
       
       if (document.querySelector("#weatherCondition") !== null) {
        document.querySelector("#weatherCondition").remove();
       }
       let condition = document.createElement('p');
       condition.id = "weatherCondition";
       condition.innerHTML = weather;
       document.querySelector("#weather-container").appendChild(condition);
       
       if (document.querySelector("#temperature") !== null) {
        document.querySelector("#temperature").remove();
       }
       let temperature = document.createElement('p');
       temperature.id = 'temperature';
       temperature.innerHTML = temp;
       document.querySelector("#weather-container").appendChild(temperature);
    });
});