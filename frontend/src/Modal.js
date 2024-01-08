import React, { useState } from 'react';

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 overflow-auto">
          <div className="bg-white w-450 p-6 absolute top-1/2 left-1/2 transform 
                          -translate-x-1/2 -translate-y-1/2 rounded-8 text-center rounded-lg border-4 border-gray-400">
            <h2 className="text-2xl font-bold mb-4">Welcome to Campus Quest!</h2>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-gray-500">
                Earn points by adventuring around campus.<br />
                Collect as many points as possible to get rewards!
              </p>
            </div>
            
            <div className="mt-6">
              <button
                onClick={closeModal}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Start Exploring!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
