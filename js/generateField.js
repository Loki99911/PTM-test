const suits = ["spades", "clubs", "diamonds", "hearts"];
const numRows = 7;
const numCols = 6;

// Создаем поле и заполняем его случайными мастями
export const generateField = new Array(numRows)
  .fill(null)
  .map(() =>
    new Array(numCols)
      .fill(null)
      .map(() => suits[Math.floor(Math.random() * suits.length)])
  );