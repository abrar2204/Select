const { createSelect } = require("./select");

let select;
const options = ["One", "Two", "Three"];

describe("Select", () => {
  beforeEach(() => {
    select = createSelect(options);
  });

  it("should have proper default values", () => {
    expect(select.getSelectedOptions()).toEqual([]);
    expect(select.getUnSelectedOptions()).toEqual(options);
  });

  it("should select a option", () => {
    select.selectAOption("Two");

    expect(select.getSelectedOptions()).toEqual(["Two"]);
    expect(select.getUnSelectedOptions()).toEqual(["One", "Three"]);
  });
  it("should unselect a option", () => {
    select.selectAOption("Two");
    select.selectAOption("Three");

    select.unSelectAOption("Two");

    expect(select.getSelectedOptions()).toEqual(["Three"]);
    expect(select.getUnSelectedOptions()).toEqual(["One", "Two"]);
  });
});
