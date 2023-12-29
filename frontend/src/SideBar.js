import React from "react";
import Tabs from "./Tabs";

function SideBar() {
	return (
    <div className="flex flex-col h-screen">
      <div className="text-4xl font-bold text-center p-4 w-full">Campus Quest</div> 

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 transition duration-300 hover:bg-blue-200 w-full">
          <div className="text-xl font-semibold">Restaurant Explorer</div>
          <div className="italic">Visit 3 restaurants</div>
          <div className="relative h-10 bg-green-300">
            <div className="absolute h-full bg-green-500" style={{ width: '50%' }}></div>
          </div>
        </div>

        <div className="p-4 transition duration-300 hover:bg-blue-200">
          <div className="text-xl font-semibold">Region Explorer</div>
          <div className="italic">Visit 2 regions</div>
          <div className="relative h-10 bg-green-300">
            <div className="absolute h-full bg-green-500" style={{ width: '30%' }}></div>
          </div>
        </div>

        <div className="p-4 transition duration-300 hover:bg-blue-200">
          <div className="text-xl font-semibold">Caffeine Addict</div>
          <div className="italic">Visit all cafés</div>
          <div className="relative h-10 bg-green-300">
            <div className="absolute h-full bg-green-500" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>

      <Tabs />
    </div>
	)
}

export default SideBar;