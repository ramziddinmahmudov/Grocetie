import { createContext, useReducer } from "react";
import { ProductItemTypes } from "../utils/user-types";
import { returnUpdatedState } from "../utils/helperFunctions";
import { activeFilterProps } from "../utils/types";

interface ProductsInitialStateTypes {
  products: ProductItemTypes[] | null;
  productsLoading: boolean;
  relatedProducts: ProductItemTypes[] | null;
  relatedProductsLoading: boolean;
  topProducts: ProductItemTypes[] | null;
  topProductsLoading: boolean;
  saleProducts: ProductItemTypes[] | null;
  saleProductsLoading: boolean;
  product: ProductItemTypes | null;
  productLoading: boolean;
  searchProducts: ProductItemTypes[] | null;
  // searchProductsLoading: boolean;
  addUpdateDeleteLoading: boolean;
  addUpdateDeleteErr: string | null;
  productsErr: string | null;
  productErr: string | null;
  filters: activeFilterProps[] | null;
  searchQuery: string;
}

// An enum with all the types of actions to use in our reducer
export enum ProductActionKind {
  GET_PRODUCTS_START = "GET_PRODUCTS_START",
  GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_FAILURE = "GET_PRODUCTS_FAILURE",

  GET_CUSTOM_PRODUCTS_START = "GET_CUSTOM_PRODUCTS_START",
  GET_CUSTOM_PRODUCTS_SUCCESS = "GET_CUSTOM_PRODUCTS_SUCCESS",
  GET_CUSTOM_PRODUCTS_FAILURE = "GET_CUSTOM_PRODUCTS_FAILURE",

  GET_PRODUCT_START = "GET_PRODUCT_START",
  GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS",
  GET_PRODUCT_FAILURE = "GET_PRODUCT_FAILURE",

  ADD_PRODUCT_START = "ADD_PRODUCT_START",
  ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS",
  ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE",

  UPDATE_PRODUCT_START = "UPDATE_PRODUCT_START",
  UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS",
  UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE",

  DELETE_PRODUCT_START = "DELETE_PRODUCT_START",
  DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS",
  DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE",

  ADD_FILTER = "ADD_FILTER",
  REMOVE_FILTER = "REMOVE_FILTER",
  SEARCH = "SEARCH",
}

// An interface for our actions
export interface ProductAction {
  type: ProductActionKind;
  payload?: ProductItemTypes[] | ProductItemTypes | CustomProductsPayloadProps;
  error?: string;
  filterArr?: activeFilterProps[] | null;
  searchText?: string;
}

interface CustomProductsPayloadProps {
  products?: ProductItemTypes[];
  type: "relatedProducts" | "topProducts" | "saleProducts" | "searchProducts";
}

const INITIAL_STATE: ProductsInitialStateTypes = {
  products: null,
  productsLoading: false,
  productsErr: null,
  ////////////////////////////////
  relatedProducts: null,
  topProducts: null,
  saleProducts: null,
  searchProducts: null,
  relatedProductsLoading: false,
  topProductsLoading: false,
  saleProductsLoading: false,
  // searchProductsLoading: false,
  ////////////////////////////////
  product: null,
  productLoading: false,
  productErr: null,
  ////////////////////////////////
  addUpdateDeleteLoading: false,
  addUpdateDeleteErr: null,
  ///////////////////////////////
  filters: JSON.parse(localStorage.getItem("activeFilters")!) || null,
  searchQuery: "",
};

export interface ProductContextTypes {
  state: ProductsInitialStateTypes;
  dispatch: React.Dispatch<ProductAction>;
  addFilter: (filter: activeFilterProps) => void;
  removeFilter: (id: string) => void;
  setSearchQuery: (val: string) => void;
}

export const ProductContext = createContext<ProductContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
  addFilter: () => {},
  removeFilter: () => {},
  setSearchQuery: () => {},
});

const ProductReducer = (
  state: ProductsInitialStateTypes,
  action: ProductAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case ProductActionKind.GET_PRODUCTS_START:
      return { ...state, productsLoading: true, productsErr: null };
    case ProductActionKind.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload as ProductItemTypes[],
        productsLoading: false,
        productsErr: null,
      };
    case ProductActionKind.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: null,
        productsLoading: false,
        productsErr: action.error!,
      };

    case ProductActionKind.GET_CUSTOM_PRODUCTS_START:
      const payload1 = action.payload as CustomProductsPayloadProps;
      return {
        ...state,
        [`${payload1.type}Loading`]: true,
        [`${payload1.type}`]: null,
      };
    case ProductActionKind.GET_CUSTOM_PRODUCTS_SUCCESS:
      const payload2 = action.payload as CustomProductsPayloadProps;
      return {
        ...state,
        [`${payload2.type}`]: payload2.products,
        [`${payload2.type}Loading`]: false,
      };
    case ProductActionKind.GET_CUSTOM_PRODUCTS_FAILURE:
      const payload3 = action.payload as CustomProductsPayloadProps;
      return {
        ...state,
        [`${payload3.type}`]: null,
        [`${payload3.type}Loading`]: false,
      };

    case ProductActionKind.GET_PRODUCT_START:
      return { ...state, productLoading: true, productErr: null };
    case ProductActionKind.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload as ProductItemTypes,
        productLoading: false,
        productErr: null,
      };
    case ProductActionKind.GET_PRODUCT_FAILURE:
      return {
        ...state,
        product: null,
        productLoading: false,
        productErr: action.error!,
      };

    case ProductActionKind.ADD_PRODUCT_START:
      return {
        ...state,
        addUpdateDeleteLoading: true,
        addUpdateDeleteErr: null,
      };
    case ProductActionKind.ADD_PRODUCT_SUCCESS:
      const allProducts = state.products ? state.products : [];
      return {
        ...state,
        products: [...allProducts, action.payload as ProductItemTypes],
        addUpdateDeleteLoading: false,
        addUpdateDeleteErr: null,
      };
    case ProductActionKind.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        addUpdateDeleteLoading: false,
        addUpdateDeleteErr: action.error!,
      };

    case ProductActionKind.UPDATE_PRODUCT_START:
      return {
        ...state,
        addUpdateDeleteLoading: true,
        addUpdateDeleteErr: null,
      };
    case ProductActionKind.UPDATE_PRODUCT_SUCCESS:
      const product = action.payload as ProductItemTypes;
      const updatedProducts = returnUpdatedState(
        state.products,
        product,
        product._id
      );
      return {
        ...state,
        products: updatedProducts,
        product: { ...product, reviewsCount: state.product?.reviewsCount! },
        addUpdateDeleteLoading: false,
        addUpdateDeleteErr: null,
      };
    case ProductActionKind.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        addUpdateDeleteLoading: false,
        addUpdateDeleteErr: action.error!,
      };

    case ProductActionKind.DELETE_PRODUCT_START:
      return {
        ...state,
        addUpdateDeleteLoading: true,
        addUpdateDeleteErr: null,
      };
    case ProductActionKind.DELETE_PRODUCT_SUCCESS:
      const updatedProduts = state.products
        ? state.products.filter((i) => i._id !== state.product?._id)
        : [];
      return {
        ...state,
        products: updatedProduts,
        addUpdateDeleteLoading: false,
        addUpdateDeleteErr: null,
      };
    case ProductActionKind.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        addUpdateDeleteLoading: false,
        addUpdateDeleteErr: action.error!,
      };

    case ProductActionKind.ADD_FILTER:
      return { ...state, filters: action.filterArr! };

    case ProductActionKind.REMOVE_FILTER:
      return { ...state, filters: action.filterArr! };

    case ProductActionKind.SEARCH:
      return { ...state, searchQuery: action.searchText! };

    default:
      return state;
  }
};

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE);

  const addFilter = (obj: activeFilterProps) => {
    let updatedArr: activeFilterProps[];

    if (obj.type === "price" && state.filters) {
      const arr = state.filters.filter((i) => i.type !== "price");
      updatedArr = [...arr, obj];
    } else if (obj.type === "rating" && state.filters) {
      const arr = state.filters.filter((i) => i.type !== "rating");
      updatedArr = [...arr, obj];
    } else {
      updatedArr = state.filters ? [...state.filters, obj] : [obj];
    }

    localStorage.setItem("activeFilters", JSON.stringify(updatedArr));
    dispatch({ type: ProductActionKind.ADD_FILTER, filterArr: updatedArr });
  };

  const removeFilter = (id: string) => {
    if (!state.filters) return;

    const updated = state.filters.filter((i) => i.id !== id);
    if (updated.length === 0) localStorage.removeItem("activeFilters");
    else localStorage.setItem("activeFilters", JSON.stringify(updated));

    const filterArr = updated.length > 0 ? updated : null;
    dispatch({ type: ProductActionKind.REMOVE_FILTER, filterArr });
  };

  const setSearchQuery = (val: string) => {
    dispatch({ type: ProductActionKind.SEARCH, searchText: val });
  };

  const values = {
    state,
    dispatch,
    addFilter,
    removeFilter,
    setSearchQuery,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
