import { numVisited, updateMarker } from "./markers/Markers";

let sidebarUpdateCallback = null; // Callback function to update the sidebar

function setSidebarUpdateCallback(callback) {
  sidebarUpdateCallback = callback;
}

function notifySidebarUpdate(numVisited) {
  if (sidebarUpdateCallback) {
    sidebarUpdateCallback(numVisited);
  }
}

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
      updateMarker(markers);
      notifySidebarUpdate(numVisited(markers));
      break;
    case 's':
      window.blueDot.setLngLat({ lat: currentLngLat.lat - step, lng: currentLngLat.lng });
      updateMarker(markers);
      notifySidebarUpdate(numVisited(markers));
      break;
    case 'a':
      window.blueDot.setLngLat({ lat: currentLngLat.lat, lng: currentLngLat.lng - step });
      updateMarker(markers);
      notifySidebarUpdate(numVisited(markers));
      break;
    case 'd':
      window.blueDot.setLngLat({ lat: currentLngLat.lat, lng: currentLngLat.lng + step });
      updateMarker(markers);
      notifySidebarUpdate(numVisited(markers));
      break;
    default:
      return;
  }
}

export { inflateMarker, resetMarker, handleKeyDown, setSidebarUpdateCallback };
