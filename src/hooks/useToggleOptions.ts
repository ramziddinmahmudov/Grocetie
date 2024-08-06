import { useState } from "react";

const useToggleOptions = (numOfItems: number) => {
  const [filtersOpen, setFiltersOpen] = useState<boolean[]>(
    new Array(numOfItems).fill(false)
  );

  const toggleOptionsHandler = (num: number) => {
    const array = [...filtersOpen];
    filtersOpen.fill(false);
    filtersOpen[num] = !array[num];
    setFiltersOpen([...filtersOpen]);
  };

  return { filtersOpen, toggleOptionsHandler };
};

export default useToggleOptions;
