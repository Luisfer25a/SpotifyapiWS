/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
const axios = require('axios')
const express = require("express");
var request = require('request'); // "Request" library
const app = express();


app.listen(10000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});

var client_id = 'fb296c0ee46b4fe9b59eda55c233e6df'; // id de cliente
var client_secret = 'b41703b2ea0143ac93f1ca78a0d0af7b'; // secreto de cliente

app.get('/', function (req, res) {
	var dnc = req.header('danceability');
	var ener = req.header('energy');
	var val = req.header('valence');
	var acous = req.header('acousticness');
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&target_danceability='+dnc+'&target_popularity=50&target_valence='+val+'&target_energy='+ener+'&target_energy='+acous+'&limit=1&market=US',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      res.send(body);
	  
    });
  }
});
});
app.get('/user', function (req, res) {
	
	var id = req.header('user');
	 
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/' + id,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      res.send(body);
	  
    });
  }
});
});
// your application requests authorization

