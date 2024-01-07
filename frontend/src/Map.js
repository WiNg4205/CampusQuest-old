import React, { useEffect, useRef } from 'react';
import markerData from './mapHelpers/MarkerData';
import { addPopUp } from './mapHelpers/PopUp';
import { inflateMarker, resetMarker, handleKeyDown } from './mapHelpers/MapUtil';
import { setModeUpdateCallback } from './sidebarHelpers/LocationButton';
import Polygon from './mapHelpers/Polygons';


var markers = []; // Declare markers globally
var regions = {};

// function postLocationData(locationData) {
//   console.log("interval");
//   fetch("/api", {
//     method: "POST",
//     body: JSON.stringify({
//       data: locationData,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     }
//   }).then(
//       response => response.json()
//   ).then(
//       data => {
//           console.log(data);
//       }
//   );
// }
function initializeBlueDot(window, map, locationData) {
  window.blueDot = new window.Mazemap.BlueDot({
    map: map,
  })
  .setZLevel(1)
  .setAccuracy(10)
  .setLngLatAnimated(locationData)
  .show();
}

function initializePolygons(map) {
  map.addLayer({
    id: 'custom-polygon-layer',
    type: "fill",
    source: {
      type: 'geojson',
      data: null,
    },
    paint: {
      "fill-color": "rgba(255, 255, 0, 0.2)",
      "fill-outline-color": "red"
    }
  });

  map.getSource("custom-polygon-layer").setData({type: "FeatureCollection", features: Polygon});
}

function initializeMarkers(map) {
  markerData.forEach(markerDetails => {
    const lngLat = markerDetails.lngLat;
    const options = markerDetails.options;
    const markerObject = new window.Mazemap.MazeMarker(options).setLngLat(lngLat).addTo(map);

    const marker = {
      "marker" : markerObject,
      "name" : markerDetails.name,
      "description" : markerDetails.description,
      "imgUrl" : markerDetails.imgUrl,
      "visited" : false
    }

    markers.push(marker);
    addPopUp(marker);
  });

  markers.forEach((marker) => { // icons inflate on mouse hover
    let markerObject = marker["marker"];
    markerObject.getElement().addEventListener('mouseenter', () => {
      inflateMarker(markerObject);
    });

    markerObject.getElement().addEventListener('mouseleave', () => {
      resetMarker(markerObject);
    });
  });
}

function initializeRegions() {
  Polygon.forEach(polygon => {
    const name = polygon.properties["name"]
    regions[name] = false;
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
      // postLocationData(locationData); // COMMENT OUT FOR DEPLOYING
    },
    function(error) {
      console.error('Error getting user location:', error);
    },
  )
}


function Map() {
  const intervalRef = useRef(null);
  const gameLocationRef = useRef(null);

  useEffect(() => {
    setModeUpdateCallback((locationModeActive) => {
      if (locationModeActive) {
        gameLocationRef.current = { ...window.blueDot.lngLat }; // Shallow copy to save game location
        updateLocation(navigator, window);
        intervalRef.current = setInterval(() => {
          updateLocation(navigator, window);
        }, intervalTime);
      } else {
        clearInterval(intervalRef.current);
        window.blueDot.setLngLat(gameLocationRef.current);
      }
    });
  }, []);

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
  const zLevel = 'G';

  script.onload = () => {
    const map = new window.Mazemap.Map({
      container: "map",
      campuses: campusId,
      center: lngLat,
      zoom: zoom,
      zLevel: zLevel
    });

    map.on('load', function() {
      initializeRegions();
      initializeMarkers(map);
      initializePolygons(map);
      initializeBlueDot(window, map, lngLat);
    });
    
    return () => {
      map.destroy();
      clearInterval(interval);
    };
  };

  return <div id="map" className="mazemap"></div>;
};

document.addEventListener('keydown', (event) => handleKeyDown(event, markers, regions));


export default Map;