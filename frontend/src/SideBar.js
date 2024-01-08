import React, { useState, useEffect } from "react";
import LocationButton from "./sidebarHelpers/LocationButton";
import { setSidebarUpdateCallback } from "./mapHelpers/MapUtil";
import { totalPoints } from "./sidebarHelpers/Points"
import QuestList from "./sidebarHelpers/QuestList";
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
