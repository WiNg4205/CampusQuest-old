import React from "react";

function Quest({ title, completed, category, goal, visitedCount, points }) {
  const progress = (visitedCount / goal) * 100;

  return (
    <div className="p-4 transition duration-300 hover:bg-blue-200 w-full">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">{title}</div>
        {completed ? (
          <div className="bg-green-500 text-white rounded-full px-2 py-1">Completed</div>
        ) : (
          <div className="bg-green-300 text-white rounded-full px-2 py-1">In Progress</div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="italic">Visit {goal} {category}</div>
        <div className="bg-green-900 mt-2 text-white rounded-full px-2 py-2">{points} pts</div>
      </div>
      <div className="relative h-10 bg-green-300">
        <div className="absolute h-full bg-green-500" style={{ width: `${Math.min(progress, 100)}%` }}></div>
      </div>
    </div>
  );
}

function QuestList({ visitedCount }) {
  return (
    <div className="p-4">
      <Quest title="Restaurant Explorer" category={"restaurants"} completed={visitedCount["restaurants"] >= 3} goal={3} visitedCount={visitedCount["restaurants"]} points={10}/>
      <Quest title="Restaurant Explorer II" category={"restaurants"} completed={visitedCount["restaurants"] >= 10} goal={10} visitedCount={visitedCount["restaurants"]} points={50}/>
      <Quest title="Region Explorer" category={"regions"} completed={visitedCount["regions"] >= 2} goal={2} visitedCount={visitedCount["regions"]} points={15}/>
      <Quest title="Caffeine Addict" category={"cafés"} completed={visitedCount["cafes"] >= 3} goal={3} visitedCount={visitedCount["cafes"]} points={20}/>
    </div>
  );
}

export default QuestList;