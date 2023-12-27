import React, { useEffect, useState } from 'react';

function Map() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.mazemap.com/js/v2.0.114/mazemap.min.js';
    script.async = true;
    
    document.head.appendChild(script);

    const lngLat = {lng: 151.2300, lat: -33.9172};
    const campusId = 111;
    const zLevel = 3;

    script.onload = () => {
      const map = new window.Mazemap.Map({
        container: 'map',
        campuses: campusId,
        center: lngLat,
        zoom: 16,
        zLevel: zLevel
      });

      // get user's location data
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            var locationData = {lng: position.coords.longitude, lat: position.coords.latitude};

            // add blue dot to map
            map.on('load', function() {
              window.blueDot = new window.Mazemap.BlueDot({
                map: map,
              })
                .setZLevel(zLevel)
                .setAccuracy(10)
                .setLngLat(locationData)
                .setBearingAccuracy(10)
                .setBearing(0)
                .showBearingHint()
                .show();
            })
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
      else {
        console.error('Geolocation is not supported by this browser.');
      }

      return () => {
        map.destroy();
      };
    };
  }, []);

  return <div id="map" className="mazemap"></div>;
};


export default Map;