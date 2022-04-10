const inputElement = document.getElementById("input");
const arrowElement = document.getElementById("arrow");
const optionsElement = document.getElementById("options");
const selectedOptionsElement = document.getElementById("selected-options");

let chosenOptions = [];
const gameOptions = ["Monster Hunter", "Witcher", "Uncharted", "Last of Us"];

const addToSelectedOptions = (option) => {
  const p = document.createElement("p");
  p.append(option);
  p.classList.add("option");

  p.addEventListener("click", (e) => {
    chosenOptions = chosenOptions.filter((o) => o !== option);
    selectedOptionsElement.removeChild(p);
  });

  selectedOptionsElement.appendChild(p);
};

const addOptionsToDropDown = (options) => {
  const optionNodes = options.map((option) => {
    const p = document.createElement("p");
    p.append(option);
    p.classList.add("option");
    p.addEventListener("click", () => {
      addToSelectedOptions(option);
      optionsElement.removeChild(p);
      chosenOptions.push(option);
    });
    return p;
  });
  optionsElement.innerHTML = "";
  optionNodes.forEach((o) => optionsElement.appendChild(o));
};

addOptionsToDropDown(gameOptions);

arrowElement.addEventListener("click", (e) => {
  if (optionsElement.classList.contains("closed")) {
    arrowElement.setAttribute(
      "src",
      "https://img.icons8.com/ios/20/000000/delete-sign--v1.png"
    );
    optionsElement.classList.remove("closed");
  } else {
    arrowElement.setAttribute(
      "src",
      "https://img.icons8.com/ios/20/000000/expand-arrow--v2.png"
    );
    optionsElement.classList.add("closed");
  }
});
