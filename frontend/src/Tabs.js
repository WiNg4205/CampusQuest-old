import React, { useState } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState('quests');

  const getTabClassName = (tab) => { // change colour when tab is clicked
    return `flex-1 text-center font-bold text-xl ${
      activeTab === tab ? 'text-blue-500' : 'text-gray-800'
    } cursor-pointer hover:${
      activeTab !== tab ? 'text-gray-600' : 'text-blue-500'
    }`;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex p-4">
      <div className={getTabClassName('quests')} onClick={() => handleTabClick('quests')}>
        Quests
      </div>
      <div className={getTabClassName('rewards')} onClick={() => handleTabClick('rewards')}>
        Rewards
      </div>
    </div>
  );
}

export default Tabs;