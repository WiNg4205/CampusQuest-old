import React, { useEffect } from 'react';
import markerData from './MarkerData';
import { inflateMarker, resetMarker, handleKeyDown } from './MapUtil';

var markers = []; // Declare markers globally

function Map() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.mazemap.com/js/v2.0.114/mazemap.min.js';
    script.async = true;
    
    document.head.appendChild(script);

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

      function addMarkers() {
        var i, lngLat, options, marker;
      
        for (i = 0; i < markerData.length; i++) {
            lngLat = markerData[i].lngLat;
            options = markerData[i].options;
            marker = new window.Mazemap.MazeMarker(options).setLngLat(lngLat).addTo(map);
            markers.push(marker);
        }
      }
      addMarkers();
      
      map.on('load', function() {
        window.blueDot = new window.Mazemap.BlueDot({
            map: map,
        })
        .setZLevel(3)
        .setLngLat( {lng: 151.2300, lat: -33.9172} )
        .show();
    
    
        map.on('click', function (ev) {
            window.blueDot.setLngLat(ev.lngLat, {animate: true});
        });

        markers.forEach((marker) => {
          marker.getElement().addEventListener('mouseenter', () => {
              inflateMarker(marker);
          });
      
          marker.getElement().addEventListener('mouseleave', () => {
              resetMarker(marker);
          });
        });
      });
      
      return () => {
        map.destroy();
      };
    };
  }, []);

  return <div id="map" className="mazemap"></div>;
};

document.addEventListener('keydown', (event) => handleKeyDown(event, markers));


export default Map;