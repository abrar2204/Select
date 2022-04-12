const inputElement = document.getElementById("input");
const arrowElement = document.getElementById("arrow");
const optionsElement = document.getElementById("options");
const selectedOptionsElement = document.getElementById("selected-options");
const selectElement = document.getElementById("select");

let chosenOptions = [];
const gameOptions = [
  "Monster Hunter",
  "Witcher",
  "Uncharted",
  "Last of Us",
  "Monster Hunter",
  "Witcher",
  "Uncharted",
  "Last of Us",
];

const removeOptionFromChosenOptions = (option) =>
  chosenOptions.filter((o) => o !== option);

const addToSelectedOptions = (option) => {
  const p = document.createElement("p");
  p.append(option);
  p.classList.add("option");

  p.addEventListener("click", (e) => {
    chosenOptions = removeOptionFromChosenOptions(option);
    selectedOptionsElement.removeChild(p);
  });

  selectedOptionsElement.appendChild(p);
};

const addNoOptionsWhenNoOptionsAreAvailable = () => {
  if (optionsElement.children.length == 0) {
    optionsElement.innerHTML = `<p style='text-align:center'>No Options Available</p>`;
  }
};

const addOptionsToDropDown = (options) => {
  const optionNodes = options.map((option) => {
    const p = document.createElement("p");
    p.append(option);
    p.classList.add("option");
    p.addEventListener("click", () => {
      addToSelectedOptions(option);
      optionsElement.removeChild(p);
      addNoOptionsWhenNoOptionsAreAvailable();
      chosenOptions.push(option);
    });
    return p;
  });
  optionsElement.innerHTML = "";
  optionNodes.forEach((o) => optionsElement.appendChild(o));
  addNoOptionsWhenNoOptionsAreAvailable();
};

arrowElement.addEventListener("click", (e) => {
  if (optionsElement.classList.contains("closed")) {
    inputElement.value = "";
    const filteredOptions = gameOptions.filter(
      (option) => !chosenOptions.includes(option)
    );
    addOptionsToDropDown(filteredOptions);
    showOptions();
  } else {
    closeOptions();
  }
});

selectElement.addEventListener("blur", (e) => {
  if (!optionsElement.classList.contains("closed")) {
    closeOptions();
  }
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
