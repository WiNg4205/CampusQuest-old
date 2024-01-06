function addPopUp(marker) {
  const markerObject = marker.marker
  const name = marker.name;
  const description = marker.description
  const image = marker.imgUrl;
  const popup = new window.Mazemap.Popup({closeOnClick: true, offset: [0, -27]})
  const htmlString = `
  <div class="bg-gray-100">
    <img src="${image}" alt="${name}" width="500" height="600">
    <h3 class="text-xl font-bold text-blue-500">${name}</h3>
    <p class="text-sm text-black">${description}</p>
  </div>
  `;

  popup.setHTML(htmlString);
  markerObject.setPopup(popup);  
}


export { addPopUp };