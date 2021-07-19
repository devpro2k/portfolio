import getData from './curtemp-s.js';
import forecast from './sevenday-s.js';

let coordinates = await getData("Riverside");
forecast(coordinates);

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;
    if (inputVal.trim() === "") {
        document.querySelector('#cname').innerHTML = "Please enter a valid city name.";
        return "Error"
    }
    getData(inputVal)
    .then(data => {
        forecast(data);
    }).catch(error => {
        document.querySelector('#cname').innerHTML = "No match try again";
    })
})