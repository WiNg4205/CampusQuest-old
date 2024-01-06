import React, { useState, useEffect } from "react";
import LocationButton from "./sidebar/LocationButton";
import { setSidebarUpdateCallback } from "./MapUtil";
import { totalPoints } from "./sidebar/Points"
import QuestList from "./sidebar/QuestList";
// import Tabs from "./Tabs";

function SideBar() {
  const [activeTab, setActiveTab] = useState("quests"); // Default active tab is "quests"

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [visitedCount, setVisitedCount] = useState({
    "restaurants": 0,
    "cafes": 0,
    "regions": 0
  });

  useEffect(() => {
    // Set the callback to update the sidebar
    setSidebarUpdateCallback((numVisited) => {
      setVisitedCount(numVisited);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold text-center p-4">Campus Quest</div>
        <div className="text-xl font-semibold text-right">{totalPoints(visitedCount)} pts</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "quests" && (
          <QuestList visitedCount={visitedCount}/>
          
        )}

        {activeTab === "rewards" && (
          <div className="p-4">
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 transition duration-300 hover:bg-blue-200 w-full">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-semibold">Region Explorer Reward</div>
                  <div className="bg-green-500 text-white rounded-full px-2 py-1">Completed</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="italic">Master the campus</div>
                  <div className="bg-green-900 mt-2 text-white rounded-full px-2 py-2">7 pt</div>
                </div>
                <div className="relative h-10 mt-2 bg-green-300">
                  <div className="absolute h-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>

                <div className="p-4 transition duration-300 hover:bg-blue-200 w-full">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">Find Your Passion</div>
                    <div className="bg-green-500 text-white rounded-full px-2 py-1">Completed</div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="italic">Explore activities on campus</div>
                    <div className="bg-green-900 mt-2 text-white rounded-full px-2 py-2">3 pt</div>
                </div>
                <div className="relative h-10 mt-2 bg-green-300">
                    <div className="absolute h-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
                </div>
        
                <div className="p-4 transition duration-300 hover:bg-blue-200 w-full">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">Locate all restaurants</div>
                    <div className="bg-green-300 text-white rounded-full px-2 py-1">In Progress</div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="italic">Foodie</div>
                    <div className="bg-green-900 mt-2 text-white rounded-full px-2 py-2">5 pt</div>
                </div>
                <div className="relative h-10 mt-2 bg-green-300">
                    <div className="absolute h-full bg-green-500" style={{ width: '60%' }}></div>
                </div>
                </div>
        
                <div className="p-4 transition duration-300 hover:bg-blue-200 w-full">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold">Defeat Boris (Demon Lord)</div>
                    <div className="bg-gray-400 text-white rounded-full px-2 py-1">Locked</div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="italic">Future addition</div>
                    <div className="bg-gray-600 mt-2 text-white rounded-full px-2 py-2">50 pt</div>
                </div>
                <div className="relative h-10 mt-2 bg-gray-300">
                    <div className="absolute h-full bg-gray-500" style={{ width: '0%' }}></div>
                </div>
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex p-4">
        <div
          className={`flex-1 text-center font-bold text-xl cursor-pointer ${
            activeTab === "quests" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("quests")}
        >
          Quests
        </div>
        <div
          className={`flex-1 text-center font-bold text-xl cursor-pointer ${
            activeTab === "rewards" ? "text-blue-500" : ""
          }`}
          onClick={() => handleTabClick("rewards")}
        >
          Rewards
        </div>
        <LocationButton />
      </div>
    </div>
  );
}

export default SideBar;
