import './App.css';
import React from 'react';
import SideBar from './SideBar';
import Map from './Map';
import Modal from './Modal';

function App() {
  return (
    <div className="flex">
      <Modal />
      <div className="w-1/4 bg-gray-200 px-4">
        <SideBar />
      </div>

      <div className="flex-1 p-4 relative h-screen ">
        <Map />
      </div>
    </div>
  );
}

export default App;