function totalPoints(visitedCount) {
    return explorerPoints(visitedCount) + campusGuessrPoints();
}

function explorerPoints(visitedCount) {
    let points = 0;
    if (visitedCount["restaurants"] >= 3) points += 10
    if (visitedCount["restaurants"] >= 10) points += 50
    if (visitedCount["restaurants"] >= 21) points += 200

    if (visitedCount["cafes"] >= 3) points += 20
    if (visitedCount["cafes"] >= 10) points += 100

    return points;
}

function campusGuessrPoints() {
    return 0;
}

export { totalPoints };