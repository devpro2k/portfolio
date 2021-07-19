export default async function forecast({
  lat,
  lon
}) {
  const sevendayURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=imperial&appid=466dca7cca93940a33882268fd25bd99`;

  return fetch(sevendayURL)
    .then((response) => response.json())
    .then((jsObject) => {

      /*
       *  I am creating a variable then filtering the forecast array looking for the time 18:00:00:00
       *  I am also using an 'includes' in my filter (Referred ta as functional using filters)
       */
      //const forecast = jsObject.list.filter((x) => x.dt_txt.includes("18:00:00")); ***To Delete
      const forecast = jsObject.daily;
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const container = document.querySelector('[data-type="sevenday-container"]');
      container.innerHTML = "";
      for (let day = 1; day < forecast.length; day++) {
        const d = new Date(0);
        d.setUTCSeconds(forecast[day].dt);
        //const d = new Date(forecast[day].dt_txt);
        const imagesrc =
          "https://openweathermap.org/img/w/" +
          forecast[day].weather[0].icon +
          ".png";
        const desc = forecast[day].weather[0].description;
        const temp = forecast[day].temp.day;
        let div = document.createElement('div'); 
        div.classList =  "forecast-day";
        div.innerHTML = `<p>${weekdays[day-1]}</p>
        <figure>
        <img src="${imagesrc}">
        </figure>
        <p>${desc}</p>
        <p>${temp}&#8457;</p>
        `;
        container.appendChild(div);
      }
    })
    .catch(e => {
      console.log(e)
    });
}
