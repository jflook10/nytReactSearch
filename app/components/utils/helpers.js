// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var nytAPI = "4d60e927ce784f368e7d0e246154de1f";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(location) {

    console.log(location);



    // Figure out the geolocation
    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + location;
    return axios.get(queryURL).then(function(response) {
      console.log(response.data.response.docs[0]);
      var resultsArr = response.data.response.docs;
      resultsArr.forEach(function(element){
        console.log(element.web_url);
      })
      // If get get a result, return that result's formatted address property
         if (response.data.response.docs) {
        return response.data.results[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api", { title: location });
  }
};

// We export the API helper
module.exports = helper;
