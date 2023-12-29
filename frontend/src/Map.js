import React, { useEffect } from 'react';

function postLocationData(locationData) {
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

function Map() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.mazemap.com/js/v2.0.114/mazemap.min.js';
    script.async = true;
    
    document.head.appendChild(script);

    //options for map render
    const lngLat = {lng: 151.2300, lat: -33.9172};
    const campusId = 111;
    const zLevel = 3;

    // options for live location tracking
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    script.onload = () => {
      const map = new window.Mazemap.Map({
        container: 'map',
        campuses: campusId,
        center: lngLat,
        zoom: 16,
        zLevel: zLevel
      });

      const interval = setInterval(() => {
        console.log('Interval triggered');
      }, 1000);

      // get user's location data (live)
      // ISSUE: live location only updates when user leaves the web app (i.e. switches tabs/opens another app)
      if (navigator.geolocation) {
        // refer to https://www.educative.io/answers/how-to-use-geolocation-call-in-reactjs 
        // and https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
        // for docs on geolocation
        navigator.geolocation.watchPosition(
          (position) => {
            var locationData = {lng: position.coords.longitude, lat: position.coords.latitude};
            // add blue dot to map
            map.on('load', function() {
              window.blueDot = new window.Mazemap.BlueDot({
                map: map,
              })
              .setZLevel(zLevel)
              .setAccuracy(10)
              .setLngLatAnimated(locationData)
              .show();
            });

            if(window.blueDot) {
              window.blueDot.setLngLatAnimated(locationData);
              
              // post location data to server
              postLocationData(locationData);
            }

          },
          (error) => {
            console.error('Error getting user location:', error);
          },
          options
        );
      }
      else {
        console.error('Geolocation is not supported by this browser.');
      }

      return () => {
        clearInterval(interval)
        map.destroy();
      };
    };
  }, []);

  return <div id="map" className="mazemap"></div>;
};


export default Map;