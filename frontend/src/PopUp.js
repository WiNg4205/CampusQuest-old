import React, {useState, useEffect} from 'react';

function togglePopUp() {

}

function PopUp() {
    const [popUp, setPopup] = useState(false);

    useEffect(() => {
        if (popUp) {
            var popup = document.getElementById("markerPopUp");
            popup.classList.toggle
        }
    }, [popUp])

    return(
        <span class="popuptext" id="markerPopUp">Popup text...</span>
    )
}

export default PopUp;