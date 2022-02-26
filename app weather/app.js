const express = require("express");
const app = express();
const https = require('https');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){

  var query = req.body.cityName;
  var unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +",uk&appid=7d4fef281e6a98cf00e48df8e86e087c&units=metric";
  https.get(url, function(response){
    response.on('data', function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = " http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      console.log(icon);
      res.write("<h1>the tempreature in "+ query +" is " + temp + " degree celsius</h1>");
      res.write("<h1>weather description : " + description + "</h1>");
      res.write("<img src =" + imgUrl + ">");
      res.end();
    })
  })

})

app.listen(3000, function(req,res){
  console.log("server is live !");
})
