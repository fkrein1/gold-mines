function findBestSpot(
  landWidth,
  landHeight,
  exploitationWidth,
  exploitationHeight,
  goldMines,
) {
  if (
    !landWidth ||
    !landHeight ||
    !exploitationWidth ||
    !exploitationHeight ||
    goldMines.length === 0
  ) {
    return { coordinates: { x: 0, y: 0 }, goldMines: 0 };
  }

  const matrix = createMatrix(landWidth, landHeight, goldMines);
  return bestSpot(exploitationWidth, exploitationHeight, matrix);
}

function createMatrix(landWidth, landHeight, goldMines) {
  let matrix = [];
  for (let column = 0; column < landHeight; column++) {
    matrix.push([]);
    for (let row = 0; row < landWidth; row++) {
      matrix[column].push(0);
    }
  }
  goldMines.forEach((mine) => {
    matrix[mine.y][mine.x] = 1;
  });
  return matrix;
}

function bestSpot(exploitationWidth, exploitationHeight, matrix) {
  let coordinates = { x: 0, y: 0 };
  let goldMines = 0;

  const maxRow = matrix[0].length - exploitationWidth + 1;
  const maxColumn = matrix.length - exploitationHeight + 1;

  for (let column = 0; column < maxRow; column++) {
    for (let row = 0; row < maxColumn; row++) {
      let goldMinesFound = 0;

      for (let i = 0; i < exploitationHeight; i++) {
        goldMinesFound += matrix[row + i]
          .filter(
            (_item, index) =>
              index >= column && index < column + exploitationWidth,
          )
          .reduce((a, b) => a + b, 0);
      }

      if (goldMinesFound > goldMines) {
        goldMines = goldMinesFound;
        coordinates.x = column;
        coordinates.y = row;
      }
    }
  }
  return { coordinates, goldMines };
}

module.exports = findBestSpot;
