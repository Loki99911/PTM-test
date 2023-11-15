import "./helpers/render.js";

export function removeGroup(e) {
  const element = e.currentTarget;
  const currentClass = element.getAttribute("class");
  const possibleElementsArr = document.querySelectorAll("." + currentClass);
  const row = parseInt(element.getAttribute("data-row"), 10);
  const col = parseInt(element.getAttribute("data-col"), 10);
  const arrToRemove = selectElements(possibleElementsArr, row, col);
  arrToRemove.forEach((element) => (element.innerHTML = ""));
}

function selectElements(possibleElementsArr, currentElemRow, currentElemCol) {
  const selectedElements = [];
  selectElementsRecursive(
    possibleElementsArr,
    currentElemRow,
    currentElemCol,
    selectedElements
  );
  return selectedElements;
}

function selectElementsRecursive(
  possibleElementsArr,
  currentElemRow,
  currentElemCol,
  selectedElements
) {
  possibleElementsArr.forEach((element) => {
    const comparableRow = parseInt(element.getAttribute("data-row"), 10);
    const comparableCol = parseInt(element.getAttribute("data-col"), 10);
    if (
      (comparableRow === currentElemRow &&
        Math.abs(comparableCol - currentElemCol) === 1) ||
      (comparableCol === currentElemCol &&
        Math.abs(comparableRow - currentElemRow) === 1) ||
      (comparableRow === currentElemRow && comparableCol === currentElemCol)
    ) {
      if (!selectedElements.includes(element)) {
        selectedElements.push(element);
        selectElementsRecursive(
          possibleElementsArr,
          comparableRow,
          comparableCol,
          selectedElements
        );
      }
    }
  });
}
