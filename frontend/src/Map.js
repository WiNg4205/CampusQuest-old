import React, { useEffect } from 'react';

function Map() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.mazemap.com/js/v2.0.114/mazemap.min.js';
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      const map = new window.Mazemap.Map({
        container: 'map',
        campuses: 121,
        center: {lng: 151.2300, lat: -33.9172},
        zoom: 16,
        zLevel: 3
      });

      return () => {
        map.destroy();
      };
    };
  }, []);

  return <div id="map" className="mazemap"></div>;
};


export default Map;