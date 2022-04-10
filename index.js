const selectInput = document.getElementById("input");
const selectArrow = document.getElementById("arrow");
const selectOptions = document.getElementById("options");

let chosenOptions = [];
const gameOptions = ["Brachydios", "Rathalos", "Zinogre", "Safi''jiiva"];

const addOptionsToDropDown = (options) => {
  const optionNodes = options.map((option) => {
    const p = document.createElement("p");
    p.append(option);
    p.classList.add("option");

    return p;
  });
  selectOptions.innerHTML = "";
  optionNodes.forEach((o) => selectOptions.appendChild(o));
};

addOptionsToDropDown(gameOptions);

selectArrow.addEventListener("click", (e) => {
  if (selectOptions.classList.contains("closed")) {
    selectArrow.setAttribute(
      "src",
      "https://img.icons8.com/ios/20/000000/delete-sign--v1.png"
    );
    selectOptions.classList.remove("closed");
  } else {
    selectArrow.setAttribute(
      "src",
      "https://img.icons8.com/ios/20/000000/expand-arrow--v2.png"
    );
    selectOptions.classList.add("closed");
  }
});
