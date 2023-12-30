import updateMarkerSize from "./Markers";

function inflateMarker(marker) {
  var originalSize = marker.options.size;
  var newSize = originalSize * 1.2; // increase icon size by 1.2
  marker.setSize(newSize);
}

function resetMarker(marker) {
  var originalSize = marker.options.size;
  marker.setSize(originalSize);
}

function handleKeyDown(event, markers) {
  const step = 0.0001;
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
      return;
  }
}

export { inflateMarker, resetMarker, handleKeyDown }