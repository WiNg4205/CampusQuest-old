import React, { useState } from 'react';

let modeUpdateCallback = null;

export function setModeUpdateCallback(callback) {
  modeUpdateCallback = callback;
}

function notifyModeUpdate(locationModeActive) {
  if (modeUpdateCallback) {
    modeUpdateCallback(locationModeActive);
  }
}

function LocationButton() {
  const [locationModeActive, setLocationModeActive] = useState(true);

  const changeMode = () => {
    setLocationModeActive((prevActive) => !prevActive);
    notifyModeUpdate(locationModeActive);
  };

  const commonClasses = 'w-8 h-8 border-2 border-white rounded-full bg-blue-500 cursor-pointer';

  return (
    <div>
      {locationModeActive ? (
        <div
          className={`${commonClasses}`}
          onClick={changeMode}
        ></div>
      ) : (
        <div
          className={`${commonClasses} flex items-center justify-center `}
          onClick={changeMode}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}

export default LocationButton;
