import { generateField } from "./generateField.js";
import { removeGroup } from "../task.js";

function renderField(field) {
  const rootField = document.querySelector(".field");
  const domArr = generateDomElements(field);
  rootField.append(...domArr);
}

function createElement(fieldName, rowIndex, colIndex) {
  const domElement = document.createElement("div");
  domElement.classList.add(fieldName);
  domElement.addEventListener("click", (e) => removeGroup(e));
  domElement.dataset.row = rowIndex + 1;
  domElement.dataset.col = colIndex + 1;
  domElement.style.border = "1px solid black";
  // Создаем SVG-элемент
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.classList.add("svgImg");
  const useElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "use"
  );

  // Задаем атрибуты xlink для use элемента
  useElement.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "href",
    `img/symbol-defs.svg#${fieldName}`
  );

  // Добавляем use элемент в svg
  svgElement.appendChild(useElement);

  // Добавляем svg в основной элемент
  domElement.appendChild(svgElement);
  return domElement;
}

function generateDomElements(field) {
  const domArr = [];
  field.forEach((row, rowIndex) => {
    row.forEach((el, colIndex) => {
      const newElem = createElement(el, rowIndex, colIndex);
      domArr.push(newElem);
    });
  });
  return domArr;
}

renderField(generateField);
