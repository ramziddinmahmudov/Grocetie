import { ChangeEvent, SetStateAction } from "react";
import { ImageItemTypes, NewsItemTypes, ProductItemTypes } from "./user-types";
import { activeFilterProps } from "./types";

/// ADD PRODUCT MODAL HELPER FUNCTIONS
export const setImagesHandler = (
  e: ChangeEvent<HTMLInputElement>,
  setImagesForServer: (value: SetStateAction<FileList | []>) => void,
  setImagesForClient: (value: SetStateAction<ImageItemTypes[] | []>) => void
) => {
  const selectedFiles = (e.target as HTMLInputElement).files as FileList;

  /// Set images to state for server
  setImagesForServer((prevState: FileList | []): FileList => {
    const dataTransfer = new DataTransfer();
    /// Here: we combine two filelists and return new filelist
    for (let i = 0; i < prevState.length; i++)
      dataTransfer.items.add(prevState[i]);
    for (let i = 0; i < selectedFiles.length; i++)
      dataTransfer.items.add(selectedFiles[i]);
    return dataTransfer.files;
  });

  //// Set images to state for client
  let imagesArray: ImageItemTypes[] = [];
  for (let i = 0; i < selectedFiles.length; i++) {
    imagesArray.push({
      imageUrl: URL.createObjectURL(selectedFiles[i]),
      name: selectedFiles[i].name,
    });
  }

  setImagesForClient((prevState: ImageItemTypes[]): ImageItemTypes[] => [
    ...prevState,
    ...imagesArray,
  ]);
};

export const removeImagesHandler = (
  img: ImageItemTypes,
  setImagesForServer: (value: SetStateAction<FileList | []>) => void,
  setImagesForClient: (value: SetStateAction<ImageItemTypes[] | []>) => void
) => {
  /// Remove the filelist item from imagesForClient
  setImagesForClient((prevState: ImageItemTypes[]): ImageItemTypes[] =>
    prevState.filter((e: ImageItemTypes) => e.imageUrl !== img.imageUrl)
  );

  /// Remove the filelist item from imagesForServer
  setImagesForServer((prevState: FileList | []): FileList => {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < prevState.length; i++) {
      prevState[i].name !== img.name && dataTransfer.items.add(prevState[i]);
    }
    return dataTransfer.files;
  });
};

export const formatDate = function (date: Date) {
  const calcDaysPassed = (date1: Date, date2: Date) =>
    Math.round(
      Math.abs((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24))
    );

  const daysPassed = calcDaysPassed(new Date(), new Date(date));

  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(userLocale).format(new Date(date));
  }
};

export const returnUpdatedState = <T>(
  items: T[] | null,
  item: T,
  id: string
) => {
  if (!items) return null;
  const updatingItemIndex = items.findIndex((i: any) => i._id === id);
  const itemsCopy: T[] = [...items];
  itemsCopy[updatingItemIndex] = item as T;
  return itemsCopy;
};

/// This will remove dublicate elements based on id
export const removeDublicate = <T extends { _id: string }>(items: T[]) => {
  const ids = Array.from(new Set(items.map((i) => i._id)));
  let newArr: T[] = [];
  for (let i = 0; i < ids.length; i++) {
    const item = items.find((b) => b._id === ids[i]);
    if (item) newArr.push(item);
  }
  return newArr;
};

export const makeUniqueArray = <T>(items: T[]) => {
  return Array.from(new Set(items.map((i) => JSON.stringify(i)))).map((i) =>
    JSON.parse(i)
  );
};

export const signoutUser = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

export const filterProducts = (
  filters: activeFilterProps[] | null,
  products: ProductItemTypes[] | null
): ProductItemTypes[] | null => {
  if (!filters || !products) return null;
  let filteredProducts: ProductItemTypes[] = [];
  const categoryFilters = filters.filter((i) => i.type === "category");
  const priceFilter = filters.filter((i) => i.type === "price")[0];
  const ratingFilter = filters.filter((i) => i.type === "rating")[0];

  /// First we filter products by category
  categoryFilters.forEach((filter) => {
    const arr = products.filter(
      (product) => product.category._id === filter.id
    );
    filteredProducts = [...filteredProducts, ...arr];
  });

  if (categoryFilters.length === 0) filteredProducts = products;

  if (priceFilter) {
    const min = Number(priceFilter.id.split("-")[0]);
    const max = Number(priceFilter.id.split("-")[1]);
    filteredProducts = filteredProducts.filter((i) => {
      if (i.discountedPrice)
        return i.discountedPrice >= min && i.discountedPrice <= max;
      else return i.price >= min && i.price <= max;
    });
  }

  if (ratingFilter) {
    filteredProducts = filteredProducts.filter(
      (item) =>
        item.ratingsAverage >= Number(ratingFilter.id) &&
        item.ratingsAverage < Number(ratingFilter.id) + 1
    );
  }

  return filteredProducts;
};

export const sortNewsHandler = (value: string, items: NewsItemTypes[]) => {
  return items.sort((a, b) => {
    if (value === "latest")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
};
