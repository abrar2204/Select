const { createSelect } = require("./select");
const inputElement = document.getElementById("input");
const arrowElement = document.getElementById("arrow");
const optionsElement = document.getElementById("options");
const selectedOptionsElement = document.getElementById("selected-options");
const selectElement = document.getElementById("select");

const gameOptions = [
  "Monste Hunter",
  "Witcher",
  "Uncharted",
  "Last of Us",
  "Watch Dogs",
  "Far Cry",
  "Dark Souls",
  "Hades",
];

const select = createSelect(gameOptions);

const addNoOptionsWhenNoOptionsAreAvailable = () => {
  if (optionsElement.children.length == 0) {
    optionsElement.innerHTML = `<p id='no-option-available'style='text-align:center'>No Options Available</p>`;
  }
};

const removeNoOptionAvailable = () => {
  if (optionsElement.children.item(0).id === "no-option-available") {
    optionsElement.removeChild(optionsElement.children.item(0));
  }
};

const addToSelectedAndRemoveFromUnSelectedDOM = (
  optionToBeAdded,
  nodeToBeRemoved
) => {
  const node = createChosenNode(optionToBeAdded);
  selectedOptionsElement.appendChild(node);

  optionsElement.removeChild(nodeToBeRemoved);

  addNoOptionsWhenNoOptionsAreAvailable();
};

const removeFromSelectedAndAddToUnSelectedDOM = (
  optionToBeAdded,
  nodeToBeRemoved
) => {
  selectedOptionsElement.removeChild(nodeToBeRemoved);

  removeNoOptionAvailable();

  optionsElement.appendChild(createUnChosenNode(optionToBeAdded));
};

const createChosenNode = (option) => {
  const p = document.createElement("p");
  p.append(option);
  p.classList.add("option");

  p.addEventListener("click", (e) => {
    select.unSelectAOption(option);

    removeFromSelectedAndAddToUnSelectedDOM(option, p);
  });
  return p;
};

const createUnChosenNode = (option) => {
  const p = document.createElement("p");
  p.append(option);
  p.classList.add("option");
  p.addEventListener("click", () => {
    select.selectAOption(option);

    addToSelectedAndRemoveFromUnSelectedDOM(option, p);
  });
  return p;
};

const addOptionsToDropDown = (options) => {
  const optionNodes = options.map((option) => createUnChosenNode(option));
  optionsElement.innerHTML = "";
  optionNodes.forEach((node) => optionsElement.appendChild(node));
  addNoOptionsWhenNoOptionsAreAvailable();
};

arrowElement.addEventListener("click", (e) => {
  if (optionsElement.classList.contains("closed")) {
    showOptions();
  } else {
    closeOptions();
  }
});

selectElement.addEventListener("blur", (e) => {
  if (!optionsElement.classList.contains("closed")) {
    closeOptions();
  }
  inputElement.value = "";
});

const showOptions = () => {
  arrowElement.setAttribute(
    "src",
    "https://img.icons8.com/ios/20/000000/delete-sign--v1.png"
  );
  optionsElement.classList.remove("closed");
  addOptionsToDropDown(select.getUnSelectedOptions());
};

const closeOptions = () => {
  arrowElement.setAttribute(
    "src",
    "https://img.icons8.com/ios/20/000000/expand-arrow--v2.png"
  );
  optionsElement.classList.add("closed");
};

const checkIfOptionIsNotChosenAndIncludesText = (option, text) =>
  !select.getSelectedOptions().includes(option) &&
  option.toLowerCase().includes(text.toLowerCase());

inputElement.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    showOptions();

    const text = event.target.value;
    const filteredOptions = select
      .getUnSelectedOptions()
      .filter((option) =>
        checkIfOptionIsNotChosenAndIncludesText(option, text)
      );

    addOptionsToDropDown(filteredOptions);
  }
});
