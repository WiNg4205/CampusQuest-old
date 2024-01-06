import React from "react";
import QuestData from "./QuestData";

// return a list of quest codes in order e.g. ["RES1","CA1","REG1",...]
function questOrder(visitedCount) {
  let inProgressList = [];
  let lockedList = [];
  let completedList = [];

  for (let key in QuestData) {
    const status = QuestData[key].status(visitedCount);
    const points = QuestData[key].points;
    const questObject = { key, points };

    if (status === "IP") {
      inProgressList.push(questObject);
    } else if (status === "L") {
      lockedList.push(questObject);
    } else {
      completedList.push(questObject);
    }
  }

  // Sort lists by points in ascending order
  inProgressList.sort((a, b) => QuestData[a.key].points - QuestData[b.key].points);
  lockedList.sort((a, b) => QuestData[a.key].points - QuestData[b.key].points);
  completedList.sort((a, b) => QuestData[a.key].points - QuestData[b.key].points);  

  return [...inProgressList.map(item => item.key), ...lockedList.map(item => item.key), ...completedList.map(item => item.key)];
}

function Quest({ questDetails, visitedCount }) {
  return (
    <div className="p-4 transition duration-300 hover:bg-blue-200 w-full">
      <div className="flex items-center justify-between">
      <div className="text-xl font-semibold">{questDetails.title}</div>
      {questDetails.status(visitedCount) === "C" ? (
        <div className="bg-green-500 text-white rounded-full px-2 py-1">Completed</div>
      ) : questDetails.status(visitedCount) === "IP" ? (
        <div className="bg-green-300 text-white rounded-full px-2 py-1">In Progress</div>
      ) : (
        <div className="bg-gray-400 text-white rounded-full px-2 py-1">Locked</div>
      )}
      </div>
      <div className="flex items-center justify-between">
        <div className="italic">{questDetails.description}</div>
        <div className="bg-green-900 mt-2 text-white rounded-full px-2 py-2">{questDetails.points} pts</div>
      </div>

      {questDetails.status(visitedCount) === "C" ? (
      <div className="relative h-10 bg-green-300">
        <div className="absolute h-full bg-green-500" style={{ width: `100%` }}></div>
      </div>
      ) : questDetails.status(visitedCount) === "IP" ? (
        <div className="relative h-10 bg-green-300">
          <div className="absolute h-full bg-green-500" style={{ width: `${questDetails.progress(visitedCount)}%` }}></div>
        </div>
      ) : (
        <div className="relative h-10 mt-2 bg-gray-300">
          <div className="absolute h-full bg-gray-500" style={{ width: '0%' }}></div>
        </div>
      )}
    </div>
  );
}

function QuestList({ visitedCount }) {
  const orderedQuests = questOrder(visitedCount);

  return (
    <div className="p-4">
      {orderedQuests.map((questKey) => (
        <Quest key={questKey} questDetails={QuestData[questKey]} visitedCount={visitedCount} />
      ))}
    </div>
  );
}

export default QuestList;