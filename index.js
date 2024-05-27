import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const token = "074eba4301bafa70fd8450f804c2bb40"
const geo_url = "http://api.openweathermap.org/geo/1.0/direct?q=";
function weather_url(lat, lon, token) {
    return `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${token}&units=metric`;;
}


app.get("/", (req, res) => {
    res.render("index.ejs", {runScript: "./location.js"});
})

app.get("/weather", async (req, res) => {
    
    try {
        const place = req.query.place;
        let url = `${geo_url + place}&appid=${token}`
        const geo = await axios.get(url);
        const wea_url = weather_url(geo.data[0].lat, geo.data[0].lon, token);
        const weather = await axios.get(wea_url);

        // Get the current city
        const city = weather.data.city.name + "," + weather.data.city.country;

        // Group the array by days
        const weather_list = weather.data.list;
        const groupByDate = weather_list.reduce((group, date) => {
            const {dt_txt}  = date;
            const noTime = dt_txt.split(" ")[0];
            group[noTime] = group[noTime] ?? [];
            group[noTime].push(date);
            return group;
          }, {}); // This will return an object of different days as keys and the data as values
        const days = Object.keys(groupByDate).flatMap((key) => [groupByDate[key]]); // This will return an array of different days and their datas
        // Now we can work with this days, instead of weather.data
        console.log(days);

        
        res.render("index.ejs", {days: days, city: city});
    } catch (err) {
        // console.log(JSON.stringify(err));
        res.render("index.ejs", {error: JSON.stringify(err)});
    }
        
})



app.listen(port, "0.0.0.0", () => {
    console.log("listening on port: " + port);
})

