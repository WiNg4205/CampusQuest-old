import React from 'react';
import markerData from './MarkerData';
import { inflateMarker, resetMarker, handleKeyDown } from './MapUtil';

var markers = []; // Declare markers globally

function postLocationData(locationData) {
  console.log("interval");
  fetch("/api", {
    method: "POST",
    body: JSON.stringify({
      data: locationData,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  }).then(
      response => response.json()
  ).then(
      data => {
          console.log(data);
      }
  );
}

function intializeBlueDot(window, map, locationData) {
  map.on('load', function() {
    window.blueDot = new window.Mazemap.BlueDot({
      map: map,
    })
    .setZLevel(3)
    .setAccuracy(10)
    .setLngLatAnimated(locationData)
    .show();
  });
}

function updateLocation(navigator, window) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      var locationData = {lng: position.coords.longitude, lat: position.coords.latitude};
      // update blue dot location
      if (window.blueDot) {
        window.blueDot.setLngLatAnimated(locationData);
      }
      else {
        console.log("BLUE DOT NOT SET");
      }

      // send data to server
      postLocationData(locationData);
    },
    function(error) {
      console.error('Error getting user location:', error);
    }
  )
}

function addMarkers(map) {
  let i, lngLat, options, marker, markerObject;

  for (i = 0; i < markerData.length; i++) {
    lngLat = markerData[i].lngLat;
    options = markerData[i].options;
    markerObject = new window.Mazemap.MazeMarker(options).setLngLat(lngLat).addTo(map);
    marker = {
      "marker" : markerObject,
      "visited" : false
    }
    markers.push(marker);
  }
}

function Map() {
  const script = document.createElement('script');
  script.src = 'https://api.mazemap.com/js/v2.0.114/mazemap.min.js';
  script.async = true;
  
  document.head.appendChild(script);

  // options for live location
  let interval;
  const intervalTime = 10000;

  //options for map render
  const campusId = 111;    
  const lngLat = {lng: 151.2300, lat: -33.9172};
  const zoom = 16;
  const zLevel = 3;

  script.onload = () => {
    const map = new window.Mazemap.Map({
      container: "map",
      campuses: campusId,
      center: lngLat,
      zoom: zoom,
      zLevel: zLevel
    });

    addMarkers(map);

    // get user's location data (live)
    if (navigator.geolocation) {
      // refer to https://www.educative.io/answers/how-to-use-geolocation-call-in-reactjs 
      // and https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
      // for docs on geolocation
      
      // TODO: blue dot may not be updating/not cleared upon update
      // intialize blue dot
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var locationData = {lng: position.coords.longitude, lat: position.coords.latitude};
          intializeBlueDot(window, map, locationData);
        },
        function(error) {
          console.error('Error getting user location:', error);
        }
      )

      interval = setInterval(() => {
        updateLocation(navigator, window);
      }, intervalTime);

    }
    else {
      console.error('Geolocation is not supported by this browser.');
    }
    
    map.on('load', function() {
      map.on('click', function (ev) {
          window.blueDot.setLngLat(ev.lngLat, {animate: true});
      });

      markers.forEach((marker) => {
        let markerObject = marker["marker"];
        markerObject.getElement().addEventListener('mouseenter', () => {
          inflateMarker(markerObject);
        });
    
        markerObject.getElement().addEventListener('mouseleave', () => {
          resetMarker(markerObject);
        });
      });
    });
    
    return () => {
      map.destroy();
      clearInterval(interval);
    };
  };

  return <div id="map" className="mazemap"></div>;
};

document.addEventListener('keydown', (event) => handleKeyDown(event, markers));


export default Map;