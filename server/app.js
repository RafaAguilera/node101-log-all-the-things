const express = require('express')
const morgan = require('morgan')
const app = express()
const rt = require("file-stream-rotator")
let csvToJson = require('convert-csv-to-json');
let jsonlog = require('../jlog.json')
let fileInputName = 'log.csv'; 
let fileOutputName = 'jlog.json';
app.set("json spaces", 2)
morgan.token("custom", ":user-agent; :date[iso]; :method; :url; :http-version; :status")
let writer = rt.getStream({filename:"log.csv"});
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
let json = csvToJson.getJsonFromCsv("log.csv");

app.use(morgan("custom", { stream: writer }))
app.get('/', function (req, res) {
  let dt = new Date;
  res.send('Ok!').status(200)
  console.log(`${req.get('user-agent')},${dt.toISOString()},GET,/,HTTP/1.1,200`)
  })
app.get('/logs', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json(jsonlog);
    })
module.exports = app;
