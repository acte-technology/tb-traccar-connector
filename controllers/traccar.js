//handle Traccar app requests
var express = require('express');
var router = express.Router();
const axios = require('axios');
const validator = require('validator');
require('dotenv').config();

const baseUrl = process.env.BASE_URL;

if(!baseUrl){
  throw new Error('Please add BASE_URL in .env file');
}

function buildUrl(id){
  if(id){ return baseUrl+"/api/v1/"+id+"/telemetry"; }
  else { throw new Error('Invalid request'); }
}

router.post('/', function (req, res) {

  try {

    var url = buildUrl(validator.escape(req.query.id));
    var timestamp = validator.toInt(req.query.timestamp);
    var date = new Date(timestamp*1000).toString();

    var body = {
      timestamp: timestamp,
      date: date,
      longitude: validator.toFloat(req.query.lon),
      latitude: validator.toFloat(req.query.lat),
      speed: validator.toFloat(req.query.speed),
      bearing: validator.toFloat(req.query.bearing),
      altitude: validator.toFloat(req.query.altitude),
      accuracy: validator.toFloat(req.query.accuracy),
      battery: validator.toFloat(req.query.batt)
    };

  } catch (error) {
    console.error('Traccar validation error');
    res.status(401).send('VALIDATION ERROR');
  }


  axios.post(url, body)
  .then(function (response) {
    console.log('Traccar POST: ' + url);
    res.status(200).send('OK');
  })
  .catch(function (error) {
    console.log('Traccar POST ERROR', { error: true, url: url, body: body });
    res.status(error.response.status).send('ERROR');
  });

})

module.exports = router;
