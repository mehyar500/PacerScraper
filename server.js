const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const cheerio = require('cheerio');
const path = require("path");
const fs = require("fs");
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));

let pacerURL = "https://www.pacer.gov/announce.html";
let linksTextArray = [];
let linksArray = [];
let linksObj = {};

request.get(pacerURL, function(error, response, body){
  let $ = cheerio.load(body);

  if (error) {
    res.json({
      confirmation: 'fail',
      message: error
    });
  } else {
    // console.log(body);
    $(".linktxt").each(function(index, link) {
      // console.log($(link).text().valueOf());
      linksTextArray.push($(link).text().valueOf());

      // console.log("https://www.pacer.gov"+$(link).attr("href").valueOf());
      linksArray.push("https://www.pacer.gov"+$(link).attr("href").valueOf());
    });

    for (let i = 0; i < 15; i++) {
      console.log(linksTextArray[i], linksArray[i]);
    }

  }

});


app.get("/", function(req, res) {

  res.json(linksObj);

});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
