import React, { useState, useEffect } from "react";
import { setSidebarUpdateCallback } from "./MapUtil";
// import Tabs from "./Tabs";

function SideBar() {
  const [activeTab, setActiveTab] = useState("quests"); // Default active tab is "quests"

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [visitedCount, setVisitedCount] = useState(0);

  useEffect(() => {
    // Set the callback to update the sidebar
    setSidebarUpdateCallback((numVisited) => {
      setVisitedCount(numVisited);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="text-4xl font-bold text-center p-4 w-full">Campus Quest</div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "quests" && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 transition duration-300 hover:bg-blue-200 w-full">
              <div className="text-xl font-semibold">Restaurant Explorer</div>
              <div className="italic">Visit 3 restaurants</div>
              <div className="relative h-10 bg-green-300">
                <div className="absolute h-full bg-green-500" style={{ width: "50%" }}></div>
              </div>
            </div>

            <div className="p-4 transition duration-300 hover:bg-blue-200">
              <div className="text-xl font-semibold">Region Explorer</div>
              <div className="italic">Visit 2 regions</div>
              <div className="relative h-10 bg-green-300">
                <div className="absolute h-full bg-green-500" style={{ width: "50%" }}></div>
              </div>
            </div>

            <div className="p-4 transition duration-300 hover:bg-blue-200">
              <div className="text-xl font-semibold">Caffeine Addict</div>
              <div className="italic">Visit all cafés</div>
              <div className="relative h-10 bg-green-300">
                <div className="absolute h-full bg-green-500" style={{ width: "50%" }}></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "rewards" && (
          <div className="p-4 transition duration-300 hover:bg-blue-200">
            {/* Content for Rewards tab */}
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
      </div>
    </div>
  );
}

export default SideBar;
