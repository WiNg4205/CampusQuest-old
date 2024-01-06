var QuestData = {
  "RES1":
  {
    title: 'Restaurant Explorer I',
    description: 'Visit 3 restaurants',
    points: 10,
    progress(visitedCount) {
      return (visitedCount["restaurants"] / 3) * 100;
    },
    status(visitedCount) {
      if (visitedCount["restaurants"] < 3) return "IP";
      else return "C";
    }
  },
  "RES2":
  {
    title: 'Restaurant Explorer II',
    description: 'Visit 10 restaurants',
    points: 50,
    progress(visitedCount) {
      return (visitedCount["restaurants"] / 10) * 100;
    },
    status(visitedCount) {
      if (visitedCount["restaurants"] < 3) return "L";
      else if (visitedCount["restaurants"] < 10) return "IP";
      else return "C";
    }
  },
  "RES3":
  {
    title: 'Restaurant Explorer III',
    description: 'Visit all 21 restaurants',
    points: 200,
    progress(visitedCount) {
      return (visitedCount["restaurants"] / 21) * 100;
    },
    status(visitedCount) {
      if (visitedCount["restaurants"] < 3) return "L";
      else if (visitedCount["restaurants"] < 10) return "L";
      else if (visitedCount["restaurants"] < 21) return "IP";
      else return "C";
    }
  },
  "CA1":
  {
    title: 'Caffeine Addict I',
    description: 'Visit 3 cafés',
    points: 20,
    progress(visitedCount) {
      return (visitedCount["cafes"] / 3) * 100;
    },
    status(visitedCount) {
      if (visitedCount["cafes"] < 3) return "IP";
      else return "C";
    }
  },
  "CA2":
  {
    title: 'Caffeine Addict II',
    description: 'Visit all 10 cafés',
    points: 100,
    progress(visitedCount) {
      return (visitedCount["cafes"] / 10) * 100;
    },
    status(visitedCount) {
      if (visitedCount["cafes"] < 3) return "L";
      else if (visitedCount["cafes"] < 10) return "IP";
      else return "C";
    }
  },
  "REG1":
  {
    title: 'Region Explorer I',
    description: 'Visit 2 regions',
    points: 15,
    progress(visitedCount) {
      return (visitedCount["regions"] / 2) * 100;
    },
    status(visitedCount) {
      if (visitedCount["regions"] < 2) return "IP";
      else return "C";
    }
  },
  "REG2":
  {
    title: 'Region Explorer II',
    description: 'Visit all 7 regions',
    points: 50,
    progress(visitedCount) {
      return (visitedCount["regions"] / 7) * 100;
    },
    status(visitedCount) {
      if (visitedCount["regions"] < 2) return "L";
      else if (visitedCount["regions"] < 7) return "IP";
      else return "C";
    }
  },
};

export default QuestData;