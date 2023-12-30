import React, { useEffect } from 'react';




var markerData = [
  { 
      lngLat: {lng: 151.225817, lat: -33.9153836},
      options: {
          imgUrl: 'gyg-logo.png',
          color: 'MazeRed',
          size: 50,
          innerCircle: true,
          innerCircleColor: 'white',
          innerCircleScale: 0.7,
          shape: 'marker',
          zLevel: 1
      }
  },
  {
      lngLat: {lng: 151.2309757, lat: -33.916822},
      options: {
          imgUrl: 'caffe-brioso-logo.png',
          imgScale: 2,
          color: 'MazePurple',
          size: 50,
          innerCircle: false,
          innerCircleScale: 0.6,
          shape: 'marker',
          zLevel: 1
      }
  },
  {
      lngLat: {lng: 151.2305189, lat: -33.9168135},
      options: {
          imgUrl: 'boost-juice-logo.png',
          imgScale: 2,
          color: 'MazePurple',
          size: 50,
          innerCircle: false,
          innerCircleScale: 0.6,
          shape: 'marker',
          zLevel: 1
      }
  }
];


var markers = []; // Declare allMarkers globally




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

      function addMarkers() {
        var i, lngLat, options, marker;
      
        for (i = 0; i < markerData.length; i++) {
            lngLat = markerData[i].lngLat;
            options = markerData[i].options;
            marker = new window.Mazemap.MazeMarker(options).setLngLat(lngLat).addTo(map);
            markers.push(marker);
        }
      }

      map.on('load', function() {
        addMarkers();
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

function inflateMarker(marker) {
  var originalSize = marker.options.size;
  var newSize = originalSize * 1.2; // increase icon size by 1.2
  marker.setSize(newSize);
}

function resetMarker(marker) {
  var originalSize = marker.options.size;
  marker.setSize(originalSize);
}


// Function to calculate haversine distance between two sets of coordinates
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers

  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// inflate marker if blueDot nearby
function updateMarkerSize(markers) {
  const blueDotLngLat = window.blueDot.lngLat;
  const radiusThreshold = 0.02; // radius threshold in km

  markers.forEach((marker) => {
      const markerLngLat = marker.getLngLat();
      const distance = haversineDistance(
          blueDotLngLat.lat,
          blueDotLngLat.lng,
          markerLngLat.lat,
          markerLngLat.lng
      );

      // Inflate marker when nearby
      const newSize = distance <= radiusThreshold ? marker.options.size * 1.2 : marker.options.size;
      console.log(marker.options.imgUrl, newSize, distance, blueDotLngLat);
      marker.setSize(newSize);
  });
}

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    const step = 0.0001; // Blue dot distance moved on click in coordinates
    const currentLngLat = window.blueDot.lngLat;
    switch (event.key) {
        case 'w':
            window.blueDot.setLngLat({ lat: currentLngLat.lat + step, lng: currentLngLat.lng });
            updateMarkerSize(markers);
            break;
        case 's':
            window.blueDot.setLngLat({ lat: currentLngLat.lat - step, lng: currentLngLat.lng });
            updateMarkerSize(markers);
            break;
        case 'a':
            window.blueDot.setLngLat({ lat: currentLngLat.lat, lng: currentLngLat.lng - step });
            updateMarkerSize(markers);
            break;
        case 'd':
            window.blueDot.setLngLat({ lat: currentLngLat.lat, lng: currentLngLat.lng + step });
            updateMarkerSize(markers);
            break;
        default:
            return; // Do nothing if a non-arrow key is pressed
    }
}

export default Map;