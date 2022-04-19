const createSelect = (defaultOptions) => {
  let selectedOptions = [];
  let unSelectedOptions = Array.from(defaultOptions);

  const selectAOption = (option) => {
    if (!unSelectedOptions.includes(option)) {
      return;
    }
    unSelectedOptions = unSelectedOptions.filter((o) => o !== option);
    selectedOptions.push(option);
  };
  const unSelectAOption = (option) => {
    if (!selectedOptions.includes(option)) {
      return;
    }
    selectedOptions = selectedOptions.filter((o) => o !== option);
    unSelectedOptions.push(option);
  };

  const getSelectedOptions = () => selectedOptions;
  const getUnSelectedOptions = () => unSelectedOptions;

  return {
    getSelectedOptions,
    getUnSelectedOptions,
    selectAOption,
    unSelectAOption,
  };
};

module.exports = { createSelect };
