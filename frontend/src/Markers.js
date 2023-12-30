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

export default updateMarkerSize;