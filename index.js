const inputElement = document.getElementById("input");
const arrowElement = document.getElementById("arrow");
const optionsElement = document.getElementById("options");
const selectedOptionsElement = document.getElementById("selected-options");
const selectElement = document.getElementById("select");

const gameOptions = [
  "Monster Hunter",
  "Witcher",
  "Uncharted",
  "Last of Us",
  "Watch Dogs",
  "Far Cry",
  "Dark Souls",
  "Hades",
];

let chosenOptions = [];
let unchosenOptions = gameOptions;

const removeElementFromArray = (array, elementToBeRemoved) =>
  array.filter((element) => element !== elementToBeRemoved);

const addToSelectedOptions = (option) => {
  chosenOptions.push(option);

  const node = createChosenNode(option);

  selectedOptionsElement.appendChild(node);
};

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

const createChosenNode = (option) => {
  const p = document.createElement("p");
  p.append(option);
  p.classList.add("option");

  p.addEventListener("click", (e) => {
    chosenOptions = removeElementFromArray(chosenOptions, option);
    selectedOptionsElement.removeChild(p);

    removeNoOptionAvailable();
    unchosenOptions.push(option);
    optionsElement.appendChild(createUnChosenNode(option));
  });
  return p;
};

const removeNodeFromOptionDropDown = (node) => {
  unchosenOptions = removeElementFromArray(unchosenOptions, node.textContent);
  optionsElement.removeChild(node);
};

const createUnChosenNode = (option) => {
  const p = document.createElement("p");
  p.append(option);
  p.classList.add("option");
  p.addEventListener("click", () => {
    addToSelectedOptions(option);
    removeNodeFromOptionDropDown(p);
    addNoOptionsWhenNoOptionsAreAvailable();
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
    inputElement.value = "";
    showOptions();
  } else {
    closeOptions();
  }
});

selectElement.addEventListener("blur", (e) => {
  if (!optionsElement.classList.contains("closed")) {
    closeOptions();
    addOptionsToDropDown(unchosenOptions);
  }
  inputElement.value = "";
});

const showOptions = () => {
  arrowElement.setAttribute(
    "src",
    "https://img.icons8.com/ios/20/000000/delete-sign--v1.png"
  );
  optionsElement.classList.remove("closed");
};

const closeOptions = () => {
  arrowElement.setAttribute(
    "src",
    "https://img.icons8.com/ios/20/000000/expand-arrow--v2.png"
  );
  optionsElement.classList.add("closed");
};

const checkIfOptionIsNotChosenAndIncludesText = (option, text) =>
  !chosenOptions.includes(option) &&
  option.toLowerCase().includes(text.toLowerCase());

inputElement.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    showOptions();

    const text = event.target.value;
    const filteredOptions = gameOptions.filter((option) =>
      checkIfOptionIsNotChosenAndIncludesText(option, text)
    );

    addOptionsToDropDown(filteredOptions);
  }
});

// Add option on first render
addOptionsToDropDown(unchosenOptions);
