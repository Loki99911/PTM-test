import "./helpers/render.js";
class ElementRemover {
  
  removeGroup(e) {
    const element = e.currentTarget;
    const currentClass = element.getAttribute("class");
    const possibleElementsArr = document.querySelectorAll("." + currentClass);
    const row = Number(element.getAttribute("data-row"));
    const col = Number(element.getAttribute("data-col"));
    const arrToRemove = this.selectElements(possibleElementsArr, row, col);
    arrToRemove.forEach((element) => (element.innerHTML = ""));
  }

  selectElements(possibleElementsArr, currentElemRow, currentElemCol) {
    const selectedElements = [];
    this.selectElementsRecursive(
      possibleElementsArr,
      currentElemRow,
      currentElemCol,
      selectedElements
    );
    return selectedElements;
  }

  selectElementsRecursive(
    possibleElementsArr,
    currentElemRow,
    currentElemCol,
    selectedElements
  ) {
    possibleElementsArr.forEach((element) => {
      const comparableRow = Number(element.getAttribute("data-row"));
      const comparableCol = Number(element.getAttribute("data-col"));
      if (
        (comparableRow === currentElemRow &&
          Math.abs(comparableCol - currentElemCol) === 1) ||
        (comparableCol === currentElemCol &&
          Math.abs(comparableRow - currentElemRow) === 1) ||
        (comparableRow === currentElemRow && comparableCol === currentElemCol)
      ) {
        if (!selectedElements.includes(element)) {
          selectedElements.push(element);
          this.selectElementsRecursive(
            possibleElementsArr,
            comparableRow,
            comparableCol,
            selectedElements
          );
        }
      }
    });
  }
}

// Использование
export const elementRemover = new ElementRemover();
