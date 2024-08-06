import { createContext, useContext, useEffect, useReducer } from "react";
import {
  CustomersStatsTypes,
  ProductItemTypes,
  User,
} from "../utils/user-types";
import { makeUniqueArray, signoutUser } from "../utils/helperFunctions";
import { getMe } from "../api/user";
import useAxiosPrivate from "../hooks/auth/useAxiosPrivate";
import { AuthContext } from "./AuthContext";

interface UserInitialStateTypes {
  user: User | null;
  loading: boolean;
  verifyLoading: boolean;
  resetLoading: boolean;
  changePassLoading: boolean;
  updateMeLoading: boolean;
  error: string | null;
  customer: User | null;
  customerLoading: boolean;
  customerError: string | null;
  customers: User[] | null;
  customersLoading: boolean;
  customersError: string | null;
  customersStats: CustomersStatsTypes;
  sortedCustomers: User[] | null;
  sortQuery: string;
  compare: ProductItemTypes[] | null;
  wishlisted: ProductItemTypes[] | null;
  compareWishlistLoading: boolean;
  compareWishlistError: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum UserActionKind {
  GETME_START = "GETME_START",
  GETME_SUCCESS = "GETME_SUCCESS",
  GETME_FAILURE = "GETME_FAILURE",

  UPDATE_ME_START = "UPDATE_ME_START",
  UPDATE_ME_SUCCESS = "UPDATE_ME_SUCCESS",
  UPDATE_ME_FAILURE = "UPDATE_ME_FAILURE",

  CHANGE_PASSWORD_START = "CHANGE_PASSWORD_START",
  CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE",

  VERIFY_START = "VERIFY_START",
  VERIFY_SUCCESS = "VERIFY_SUCCESS",
  VERIFY_FAILURE = "VERIFY_FAILURE",

  RESET_PASSWORD_START = "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE",

  /////////////////////////////////////////
  GET_COMPARE_OR_WISHLIST_START = "GET_COMPARE_OR_WISHLIST_START",
  GET_COMPARE_OR_WISHLIST_SUCCESS = "GET_COMPARE_OR_WISHLIST_SUCCESS",
  GET_COMPARE_OR_WISHLIST_FAILURE = "GET_COMPARE_OR_WISHLIST_FAILURE",

  ADD_TO_COMPARE = "ADD_TO_COMPARE",
  ADD_TO_COMPARE_FAIL = "ADD_TO_COMPARE_FAIL",

  REMOVE_FROM_COMPARE = "REMOVE_FROM_COMPARE",
  REMOVE_FROM_COMPARE_FAIL = "REMOVE_FROM_COMPARE_FAIL",

  ADD_TO_WISHLIST = "ADD_TO_WISHLIST",
  ADD_TO_WISHLIST_FAIL = "ADD_TO_WISHLIST_FAIL",

  REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST",
  REMOVE_FROM_WISHLIST_FAIL = "REMOVE_FROM_WISHLIST_FAIL",

  /////////////////////////////////////////
  GET_CUSTOMERS_START = "GET_CUSTOMERS_START",
  GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS",
  GET_CUSTOMERS_FAILURE = "GET_CUSTOMERS_FAILURE",

  GET_CUSTOMER_START = "GET_CUSTOMER_START",
  GET_CUSTOMER_SUCCESS = "GET_CUSTOMER_SUCCESS",
  GET_CUSTOMER_FAILURE = "GET_CUSTOMER_FAILURE",

  GET_CUSTOMERS_STATS_START = "GET_CUSTOMERS_STATS_START",
  GET_CUSTOMERS_STATS_SUCCESS = "GET_CUSTOMERS_STATS_SUCCESS",
  GET_CUSTOMERS_STATS_FAILURE = "GET_CUSTOMERS_STATS_FAILURE",

  TOGGLE_CUSTOMER_ROLE = "TOGGLE_CUSTOMER_ROLE",
}

// An interface for our actions
export interface UserAction {
  type: UserActionKind;
  payload?:
    | User
    | User[]
    | CustomersStatsTypes
    | CompareOrWishlistPayloadProps
    | string;
  error?: string;
}

interface CompareOrWishlistPayloadProps {
  data: ProductItemTypes[];
  type: "compare" | "wishlisted";
}

const INITIAL_STATE: UserInitialStateTypes = {
  user: JSON.parse(localStorage.getItem("user")!) || null,
  loading: false,
  verifyLoading: false,
  resetLoading: false,
  changePassLoading: false,
  updateMeLoading: false,
  error: null,
  customers: null,
  customersLoading: false,
  customersError: null,
  customer: null,
  customerLoading: false,
  customerError: null,
  customersStats: {
    total: 0,
    new: 0,
    thisMonth: 0,
  },
  sortedCustomers: null,
  sortQuery: "",
  compare: null,
  wishlisted: null,
  compareWishlistLoading: false,
  compareWishlistError: null,
};

interface UserContextTypes {
  state: UserInitialStateTypes;
  dispatch: React.Dispatch<UserAction>;
  sortCustomers: (arg: string) => void;
}

export const UserContext = createContext<UserContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
  sortCustomers: () => {},
});

const UserReducer = (
  state: UserInitialStateTypes,
  action: UserAction
): typeof INITIAL_STATE => {
  if (action.error?.startsWith("TokenError:")) signoutUser();
  switch (action.type) {
    //// GET ME
    case UserActionKind.GETME_START:
      return { ...state, loading: true, error: null };
    case UserActionKind.GETME_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload as User,
        loading: false,
        error: null,
      };
    case UserActionKind.GETME_FAILURE:
      localStorage.removeItem("user");
      return { ...state, user: null, loading: false };

    //// UPDATE ME
    case UserActionKind.UPDATE_ME_START:
      return { ...state, updateMeLoading: true, error: null };
    case UserActionKind.UPDATE_ME_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload as User,
        updateMeLoading: false,
        error: null,
      };
    case UserActionKind.UPDATE_ME_FAILURE:
      return { ...state, updateMeLoading: false, error: action.error! };

    ///////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////

    //// GET WISHLIST OR COMPARE
    case UserActionKind.GET_COMPARE_OR_WISHLIST_START:
      return {
        ...state,
        compareWishlistLoading: true,
        compareWishlistError: null,
      };
    case UserActionKind.GET_COMPARE_OR_WISHLIST_SUCCESS:
      const payload = action.payload as CompareOrWishlistPayloadProps;
      return {
        ...state,
        compareWishlistLoading: false,
        compareWishlistError: null,
        [`${payload.type}`]: payload.data,
      };
    case UserActionKind.GET_COMPARE_OR_WISHLIST_FAILURE:
      return {
        ...state,
        compareWishlistLoading: false,
        compareWishlistError: action.error!,
      };

    //// ADD TO WISHLIST
    case UserActionKind.ADD_TO_WISHLIST:
      state.user?.wishlisted.push(action.payload as string);
      return { ...state, user: state.user };

    //// ADD TO WISHLIST FAIL
    case UserActionKind.ADD_TO_WISHLIST_FAIL:
      state.user?.wishlisted.pop();
      return { ...state, user: state.user };

    //// REMOVE FROM WISHLIST
    case UserActionKind.REMOVE_FROM_WISHLIST:
      const wishlistedIds = state.user?.wishlisted.filter(
        (i) => i !== action.payload
      ) as string[];
      const wishlisted = state.wishlisted?.filter(
        (i) => i._id !== action.payload
      );
      return {
        ...state,
        user: { ...state.user, wishlisted: wishlistedIds } as User,
        wishlisted: wishlisted || null,
      };
    //// REMOVE FROM WISHLIST FAIL
    case UserActionKind.REMOVE_FROM_WISHLIST_FAIL:
      state.user?.wishlisted.push(action.payload as string);
      return { ...state, user: state.user };

    ///////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////

    //// ADD TO COMPARE
    case UserActionKind.ADD_TO_COMPARE:
      state.user?.compare.push(action.payload as string);
      return { ...state, user: state.user };

    case UserActionKind.ADD_TO_COMPARE_FAIL:
      state.user?.compare.pop();
      return { ...state, user: state.user };

    //// REMOVE FROM COMPARE
    case UserActionKind.REMOVE_FROM_COMPARE:
      const compareIds = state.user?.compare.filter(
        (i) => i !== action.payload
      ) as string[];
      const compare = state.compare?.filter((i) => i._id !== action.payload);
      return {
        ...state,
        user: { ...state.user, compare: compareIds } as User,
        compare: compare || null,
      };
    //// REMOVE FROM COMPARE FAIL
    case UserActionKind.REMOVE_FROM_COMPARE_FAIL:
      state.user?.compare.push(action.payload as string);
      return { ...state, user: state.user };

    //// CHANGE PASSWORD
    case UserActionKind.CHANGE_PASSWORD_START:
      return { ...state, changePassLoading: true, error: null };
    case UserActionKind.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassLoading: false,
        error: null,
      };
    case UserActionKind.CHANGE_PASSWORD_FAILURE:
      return { ...state, changePassLoading: false, error: action.error! };

    //// VERIFY
    case UserActionKind.VERIFY_START:
      return { ...state, user: null, verifyLoading: true, error: null };
    case UserActionKind.VERIFY_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload as User,
        verifyLoading: false,
        error: null,
      };
    case UserActionKind.VERIFY_FAILURE:
      return {
        ...state,
        user: null,
        verifyLoading: false,
        error: action.error!,
      };

    //// RESET PASSWORD
    case UserActionKind.RESET_PASSWORD_START:
      return { ...state, user: null, resetLoading: true, error: null };
    case UserActionKind.RESET_PASSWORD_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload as User,
        resetLoading: false,
        error: null,
      };
    case UserActionKind.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        user: null,
        resetLoading: false,
        error: action.error as string,
      };

    ///// ADMIN
    case UserActionKind.GET_CUSTOMERS_START:
      return { ...state, customersLoading: true, customersError: null };
    case UserActionKind.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload as User[],
        customersLoading: false,
        customersError: null,
      };
    case UserActionKind.GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        customersLoading: false,
        customersError: action.error!,
        customers: null,
      };

    case UserActionKind.GET_CUSTOMERS_STATS_START:
      return state;
    case UserActionKind.GET_CUSTOMERS_STATS_SUCCESS:
      return {
        ...state,
        customersStats: action.payload as CustomersStatsTypes,
      };

    case UserActionKind.GET_CUSTOMER_START:
      return {
        ...state,
        customerLoading: true,
        customerError: null,
        customer: null,
      };
    case UserActionKind.GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload as User,
        customerLoading: false,
        customerError: null,
      };
    case UserActionKind.GET_CUSTOMER_FAILURE:
      return {
        ...state,
        customerLoading: false,
        customerError: action.error!,
        customer: null,
      };

    case UserActionKind.TOGGLE_CUSTOMER_ROLE:
      const updatedCustomer = { ...state.customer, role: action.payload };
      return { ...state, customer: updatedCustomer as User };

    default:
      return state;
  }
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.accessToken) (async () => await getMe(dispatch, axiosPrivate))();
  }, [auth.accessToken, axiosPrivate]);

  // useEffect(() => {
  //   let isMounted = true;
  //   // const controller = new AbortController();

  //   const getUser = async () => {
  //     try {
  //       const { data } = await axiosPrivate.get("/users/me");
  //       isMounted &&
  //         dispatch({ type: UserActionKind.GETME_SUCCESS, payload: data.user });
  //     } catch (err) {
  //       console.error(err);
  //       dispatch({
  //         type: UserActionKind.GETME_FAILURE,
  //         error: err.name,
  //       });
  //     }
  //   };

  //   auth.accessToken && getUser();

  //   return () => {
  //     isMounted = false;
  //     // controller.abort();
  //   };
  // }, [auth.accessToken, axiosPrivate]);

  const sortCustomers = (status: string) => {
    if (!state.customers) return;
    const sorted = state.customers.filter((i) => i.status === status);

    if (status === "") state.sortedCustomers = [];
    else if (state.sortQuery && sorted.length === 0)
      state.sortedCustomers = JSON.parse(JSON.stringify(state.sortedCustomers));
    else
      state.sortedCustomers = makeUniqueArray([...sorted, ...state.customers]);

    state.sortQuery = status;
  };

  const values = {
    state,
    dispatch,
    sortCustomers,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
