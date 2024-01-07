import * as turf from '@turf/turf'
import Polygon from "./Polygons";

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

function updateMarker(markers) {
  let markerObject;
  const blueDotLngLat = window.blueDot.lngLat;
  const radiusThreshold = 0.02; // radius threshold in km
  markers.forEach((marker) => {
    markerObject = marker["marker"];
    const markerLngLat = markerObject.getLngLat();
    const distance = haversineDistance(
      blueDotLngLat.lat,
      blueDotLngLat.lng,
      markerLngLat.lat,
      markerLngLat.lng
    );

    // Inflate marker when nearby
    const newSize = distance <= radiusThreshold ? markerObject.options.size * 1.2 : markerObject.options.size;
    markerObject.setSize(newSize);
    if (distance <= radiusThreshold) marker["visited"] = true;
  });
}

function checkBlueDotIntersection(regions) {
  const coordinatesObject = window.blueDot.lngLat;
  const blueDotCoordinates = [coordinatesObject.lng, coordinatesObject.lat];

  const intersectingPolygon = Polygon.find(polygon => {
    const pt = turf.point(blueDotCoordinates);
    const isInside = turf.booleanPointInPolygon(pt, polygon);
    return isInside;
  });

  if (intersectingPolygon) {
    const name = intersectingPolygon.properties.name;
    
    regions[name] = true;
  }
}


function numVisited(markers, regions) {
  let numVisited = {
    "restaurants": 0,
    "cafes": 0,
    "regions": 0
  };

  checkBlueDotIntersection(regions);
  const values = Object.values(regions);

  values.forEach(value => {console.log(12)
    if (value) numVisited["regions"]++;
  });

  markers.forEach((marker) => {
    if (marker["visited"] === true) {
    let color = marker["marker"]._color
      if (color === 'MazeGreen') numVisited["restaurants"]++;
      else if (color === 'MazePurple') numVisited["cafes"]++;
    }
  });
  return numVisited;
}

export { updateMarker, numVisited };
