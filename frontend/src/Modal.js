import React, { useEffect, useState } from "react";

function hideModal() {
    var modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "none";
}

function Modal() {
    //const [showModal, setShowModal] = useState(false);

    return(
        <div className="modal">
            <div className="popup">
                <button onClick={hideModal}>&times;</button>
                <h2>Welcome to Campus Quest!</h2>
                <p>
                    Earn points by adventuring around campus. Collect as many points as possible to get rewards!
                </p>
                <a className="close" onClick={hideModal}>Let's Go</a>
            </div>
        </div>
    )
}

export default Modal;