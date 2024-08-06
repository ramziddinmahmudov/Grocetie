import { createContext, useEffect, useReducer } from "react";
import { CategoryItemTypes } from "../utils/user-types";
import { getCategories } from "../api/categories";

interface CategoryInitialStateTypes {
  categories: CategoryItemTypes[] | null;
  categoriesLoading: boolean;
  category: CategoryItemTypes | null;
  categoryLoading: boolean;
  error: string | null;
  addUpdateDeleteError: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum CategoryActionKind {
  GET_CATEGORY_START = "GET_CATEGORY_START",
  GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS",
  GET_CATEGORY_FAILURE = "GET_CATEGORY_FAILURE",

  GET_CATEGORIES_START = "GET_CATEGORIES_START",
  GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
  GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE",

  ADD_OR_UPDATE_CATEGORY_START = "ADD_OR_UPDATE_CATEGORY_START",
  ADD_OR_UPDATE_CATEGORY_SUCCESS = "ADD_OR_UPDATE_CATEGORY_SUCCESS",
  ADD_OR_UPDATE_CATEGORY_FAILURE = "ADD_OR_UPDATE_CATEGORY_FAILURE",

  DELETE_CATEGORY_START = "DELETE_CATEGORY_START",
  DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS",
  DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE",

  ADD_MANUAL_ERROR = "ADD_MANUAL_ERROR",
}

// An interface for our actions
export interface CategoryAction {
  type: CategoryActionKind;
  payload?: CategoryItemTypes | CategoryItemTypes[] | [];
  error?: string;
}

const INITIAL_STATE: CategoryInitialStateTypes = {
  categories: null,
  category: null,
  categoriesLoading: false,
  categoryLoading: false,
  error: null,
  addUpdateDeleteError: null,
};

interface CategoryContextTypes {
  state: CategoryInitialStateTypes;
  dispatch: React.Dispatch<CategoryAction>;
  clearError: () => void;
}

export const CategoryContext = createContext<CategoryContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
  clearError: () => {},
});

const CategoryReducer = (
  state: CategoryInitialStateTypes,
  action: CategoryAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case CategoryActionKind.GET_CATEGORIES_START:
      return { ...state, categoriesLoading: true, error: null };
    case CategoryActionKind.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload as CategoryItemTypes[],
        categoriesLoading: false,
        error: null,
      };
    case CategoryActionKind.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: null,
        categoriesLoading: false,
        error: action.error!,
      };

    case CategoryActionKind.GET_CATEGORY_START:
      return { ...state, category: null, categoryLoading: true, error: null };
    case CategoryActionKind.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload as CategoryItemTypes,
        categoryLoading: false,
        error: null,
      };
    case CategoryActionKind.GET_CATEGORY_FAILURE:
      return { ...state, categoryLoading: false, error: action.error! };

    case CategoryActionKind.ADD_OR_UPDATE_CATEGORY_START:
      return { ...state, categoryLoading: true, addUpdateDeleteError: null };
    case CategoryActionKind.ADD_OR_UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload as CategoryItemTypes[],
        categoryLoading: false,
        addUpdateDeleteError: null,
      };
    case CategoryActionKind.ADD_OR_UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        categoryLoading: false,
        addUpdateDeleteError: action.error!,
      };

    case CategoryActionKind.DELETE_CATEGORY_START:
      return { ...state, categoryLoading: true, addUpdateDeleteError: null };
    case CategoryActionKind.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload as CategoryItemTypes[],
        categoryLoading: false,
        addUpdateDeleteError: null,
      };
    case CategoryActionKind.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        categoryLoading: false,
        addUpdateDeleteError: action.error!,
      };

    default:
      return state;
  }
};

export const CategoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(CategoryReducer, INITIAL_STATE);

  const clearError = () => (state.addUpdateDeleteError = null);

  useEffect(() => {
    (async () => await getCategories(dispatch))();
  }, []);

  const values = {
    state,
    dispatch,
    clearError,
  };

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
};
