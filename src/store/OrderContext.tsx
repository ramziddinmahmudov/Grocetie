import { createContext, useCallback, useEffect, useReducer } from "react";
import {
  OrderProps,
  RevenueDataTypes,
  RevenueItemTypes,
} from "../utils/user-types";
import {
  makeUniqueArray,
  returnUpdatedState,
  signoutUser,
} from "../utils/helperFunctions";

interface OrderInitialStateTypes {
  orders: OrderProps[] | null;
  loading: boolean;
  customOrders: OrderProps[] | null;
  recentOrders: OrderProps[] | null;
  recentLoading: boolean;
  userOrders: OrderProps[] | null;
  order: OrderProps | null;
  orderLoading: boolean;
  updateLoading: boolean;
  error: string | null;
  filterQuery: string;
  sortQuery: string;
  stats: StatsTypes;
  revenue: RevenueDataTypes;
  revenueLoading: boolean;
}

export interface StatsTypes {
  total: number;
  toBePacked: number;
  onTheWay: number;
  delivered: number;
  cancelled: number;
}

// An enum with all the types of actions to use in our reducer
export enum OrderActionKind {
  GET_ORDER_START = "GET_ORDER_START",
  GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS",
  GET_ORDER_FAILURE = "GET_ORDER_FAILURE",

  GET_ORDERS_START = "GET_ORDERS_START",
  GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS",
  GET_ORDERS_FAILURE = "GET_ORDERS_FAILURE",

  GET_RECENT_ORDERS_START = "GET_RECENT_ORDERS_START",
  GET_RECENT_ORDERS_SUCCESS = "GET_RECENT_ORDERS_SUCCESS",
  GET_RECENT_ORDERS_FAILURE = "GET_RECENT_ORDERS_FAILURE",

  GET_USER_ORDERS_START = "GET_USER_ORDERS_START",
  GET_USER_ORDERS_SUCCESS = "GET_USER_ORDERS_SUCCESS",
  GET_USER_ORDERS_FAILURE = "GET_USER_ORDERS_FAILURE",

  GET_ORDERS_STATS_START = "GET_ORDERS_STATS_START",
  GET_ORDERS_STATS_SUCCESS = "GET_ORDERS_STATS_SUCCESS",
  GET_ORDERS_STATS_FAILURE = "GET_ORDERS_STATS_FAILURE",

  GET_REVENUE_STATS_START = "GET_REVENUE_STATS_START",
  GET_REVENUE_STATS_SUCCESS = "GET_REVENUE_STATS_SUCCESS",
  GET_REVENUE_STATS_FAILURE = "GET_REVENUE_STATS_FAILURE",

  UPDATE_ORDER_START = "UPDATE_ORDER_START",
  UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS",
}

// An interface for our actions
export interface OrderAction {
  type: OrderActionKind;
  payload?: OrderProps[] | OrderProps | StatsTypes | RevenueDataTypes | null;
  error?: string;
}

const RevenueItemInitialState: RevenueItemTypes = {
  new: 0,
  old: 0,
  difference: 0,
};

const INITIAL_STATE: OrderInitialStateTypes = {
  orders: null,
  order: null,
  loading: false,
  updateLoading: false,
  orderLoading: false,
  error: null,
  stats: {
    total: 0,
    toBePacked: 0,
    onTheWay: 0,
    delivered: 0,
    cancelled: 0,
  },
  revenue: {
    dayStats: RevenueItemInitialState,
    weekStats: RevenueItemInitialState,
    monthStats: RevenueItemInitialState,
    yearStats: RevenueItemInitialState,
    totalRevenue: 0,
    total: 0,
    cancelled: 0,
  },
  revenueLoading: false,
  recentOrders: null,
  recentLoading: false,
  userOrders: null,
  /// Filtering
  customOrders: null,
  filterQuery: "",
  sortQuery: "",
};

interface OrderContextTypes {
  state: OrderInitialStateTypes;
  dispatch: React.Dispatch<OrderAction>;
  filterOrders: (arg: string) => void;
  sortOrders: (arg: string) => void;
}

export const OrderContext = createContext<OrderContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
  filterOrders: () => {},
  sortOrders: () => {},
});

const OrderReducer = (
  state: OrderInitialStateTypes,
  action: OrderAction
): typeof INITIAL_STATE => {
  if (action.error?.startsWith("TokenError:")) signoutUser();

  switch (action.type) {
    case OrderActionKind.GET_ORDERS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case OrderActionKind.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload as OrderProps[],
        loading: false,
        error: null,
      };
    case OrderActionKind.GET_ORDERS_FAILURE:
      return {
        ...state,
        orders: null,
        loading: false,
        error: action.error!,
      };

    case OrderActionKind.GET_RECENT_ORDERS_START:
      return {
        ...state,
        recentLoading: true,
        error: null,
      };
    case OrderActionKind.GET_RECENT_ORDERS_SUCCESS:
      return {
        ...state,
        recentOrders: action.payload as OrderProps[],
        recentLoading: false,
        error: null,
      };
    case OrderActionKind.GET_RECENT_ORDERS_FAILURE:
      return {
        ...state,
        recentOrders: null,
        recentLoading: false,
        error: action.error!,
      };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    case OrderActionKind.GET_ORDER_START:
      return { ...state, order: null, orderLoading: true, error: null };
    case OrderActionKind.GET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload as OrderProps,
        orderLoading: false,
        error: null,
      };
    case OrderActionKind.GET_ORDER_FAILURE:
      return {
        ...state,
        order: null,
        orderLoading: false,
        error: action.error!,
      };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    case OrderActionKind.GET_USER_ORDERS_START:
      return { ...state, userOrders: null, loading: true, error: null };
    case OrderActionKind.GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        userOrders: action.payload as OrderProps[],
        loading: false,
        error: null,
      };
    case OrderActionKind.GET_USER_ORDERS_FAILURE:
      return {
        ...state,
        userOrders: null,
        loading: false,
        error: action.error!,
      };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    case OrderActionKind.GET_ORDERS_STATS_START:
      return { ...state, error: null };
    case OrderActionKind.GET_ORDERS_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload as StatsTypes,
        error: null,
      };
    case OrderActionKind.GET_ORDERS_STATS_FAILURE:
      return {
        ...state,
        error: action.error!,
      };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    case OrderActionKind.GET_REVENUE_STATS_START:
      return { ...state, revenueLoading: true, error: null };
    case OrderActionKind.GET_REVENUE_STATS_SUCCESS:
      return {
        ...state,
        revenueLoading: false,
        revenue: action.payload as RevenueDataTypes,
        error: null,
      };
    case OrderActionKind.GET_REVENUE_STATS_FAILURE:
      return { ...state, revenueLoading: false, error: action.error! };

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    case OrderActionKind.UPDATE_ORDER_START:
      return { ...state, updateLoading: true, error: null };
    case OrderActionKind.UPDATE_ORDER_SUCCESS:
      const order = action.payload as OrderProps;
      const updatedOrders = returnUpdatedState(state.orders!, order, order._id);
      return {
        ...state,
        order,
        orders: updatedOrders,
        updateLoading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const OrderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(OrderReducer, INITIAL_STATE);

  /// If the orders were filtered before, it returns the filtered ones. If there weren't, it just returns all orders
  const filterOrdersHandler = useCallback(
    (query: string) => {
      const range = query.split("-").map((i) => Number(i));
      const filtered = (state.orders as OrderProps[]).filter(
        (i) => i.totalPrice >= range[0] && i.totalPrice <= range[1]
      );
      // If there is no filter query, we just return all orders.
      if (!query) return state.orders;
      return filtered.length > 0 ? filtered : [];
    },
    [state.orders]
  );

  /// Filtering the orders based on the price
  const filterOrders = useCallback(
    (filter: string) => {
      state.filterQuery = filter;

      let filtered: OrderProps[] = [];
      /// We filter the orders here
      filtered = filterOrdersHandler(filter)!;

      /// If the orders got sorted before, we sort the filtered orders and return them.
      if (state.sortQuery) {
        const sorted = filtered!.filter((i) => i.status === state.sortQuery);
        const unsorted = filtered!.filter((i) => i.status !== state.sortQuery);
        state.customOrders = makeUniqueArray([...sorted, ...unsorted]);
        return;
      }

      /// If the orders did not get sorted before, we just return the filtered orders without sorting
      state.customOrders = filtered;
    },
    [filterOrdersHandler, state]
  );

  /// Sorting the orders based on the status
  const sortOrders = useCallback(
    (status: string) => {
      state.sortQuery = status;

      /// We check if the orders got filtered before
      const possibleFiltered = filterOrdersHandler(state.filterQuery)!;
      /// Getting 'wanted to be sort' orders
      const sorted = possibleFiltered.filter((i) => i.status === status);

      // If the user wants to clear sorting, we just return the possibleFiltered (which is state.orders if there is not filterQuery or filtered array if there is filterQuery)
      if (status === "") {
        state.customOrders = possibleFiltered;
        return;
      }

      // If there are no orders with the status with which the user want to sort, we return the customOrders when there're already customOrders or possibleFiltered when there aren't customOrders before.
      if (status !== "" && sorted.length === 0) {
        state.customOrders =
          state.customOrders?.length! > 0
            ? state.customOrders
            : possibleFiltered;
        return;
      }

      state.customOrders = makeUniqueArray([...sorted, ...possibleFiltered]);
    },
    [filterOrdersHandler, state]
  );

  /// The logic behind this function is that if the admin enters orderdetails after he filters or sorts the orders, and updates the order, customOrders will be updated too with the updated order. After the user goes back to the orders page, the customOrders will be updated.
  useEffect(() => {
    if (
      !state.loading &&
      !state.updateLoading &&
      (state.filterQuery || state.sortQuery)
    ) {
      filterOrders(state.filterQuery);
      sortOrders(state.sortQuery);
    }
  }, [
    filterOrders,
    sortOrders,
    state.filterQuery,
    state.loading,
    state.sortQuery,
    state.updateLoading,
  ]);

  const values = {
    state,
    dispatch,
    filterOrders,
    sortOrders,
  };

  return (
    <OrderContext.Provider value={values}>{children}</OrderContext.Provider>
  );
};
