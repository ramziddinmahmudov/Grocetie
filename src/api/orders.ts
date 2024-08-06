import { toast } from "react-toastify";
import { OrderAction, OrderActionKind } from "../store/OrderContext";
import { AxiosInstance } from "axios";
import { Dispatch } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { OrderDataProps } from "../utils/types";

//// FOR USERS
export const getMyOrders = async (
  dispatch: Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  query?: string
) => {
  const isRecent = query?.includes("limit=10");
  const actionKind = isRecent ? "GET_RECENT_ORDERS" : "GET_ORDERS";
  try {
    const { data } = await axiosPrivate(`orders/my-orders?${query}`);

    dispatch({
      type: OrderActionKind[`${actionKind}_SUCCESS`],
      payload: data.data,
    });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong";
    dispatch({
      type: OrderActionKind[`${actionKind}_FAILURE`],
      error: error,
    });
  }
};

export const getOneOrder = async (
  dispatch: Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  id: string
) => {
  try {
    const { data } = await axiosPrivate(`orders/${id}`);
    dispatch({
      type: OrderActionKind.GET_ORDER_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: OrderActionKind.GET_ORDER_FAILURE,
      error: err.response?.data.message || "Something went wrong.",
    });
  }
};

//// FOR ADMINS
export const getAllOrders = async (
  dispatch: Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  quary?: string
) => {
  try {
    const { data } = await axiosPrivate(`orders?${quary || ""}&limit=100`);

    dispatch({
      type: OrderActionKind.GET_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: OrderActionKind.GET_ORDERS_FAILURE,
      error: err.response?.data.message || "Something went wrong",
    });
  }
};

export const getRecentOrdersForAdmin = async (
  dispatch: Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance
) => {
  try {
    dispatch({ type: OrderActionKind.GET_RECENT_ORDERS_START });
    const { data } = await axiosPrivate(`orders/recent?sort=-createdAt`);

    dispatch({
      type: OrderActionKind.GET_RECENT_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: OrderActionKind.GET_RECENT_ORDERS_FAILURE,
      error: err.response?.data.message || "Something went wrong",
    });
  }
};

export const getOrdersStats = async (
  dispatch: Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance
) => {
  try {
    dispatch({ type: OrderActionKind.GET_ORDERS_STATS_START });
    const { data } = await axiosPrivate(`orders/stats`);

    dispatch({
      type: OrderActionKind.GET_ORDERS_STATS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: OrderActionKind.GET_ORDERS_STATS_FAILURE,
      error: err.response?.data.message || "Something went wrong",
    });
  }
};

export const getOrdersRevenueStats = async (
  dispatch: Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance
) => {
  dispatch({ type: OrderActionKind.GET_REVENUE_STATS_START });
  try {
    const { data } = await axiosPrivate(`orders/revenue-stats`);

    dispatch({
      type: OrderActionKind.GET_REVENUE_STATS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: OrderActionKind.GET_REVENUE_STATS_FAILURE,
      error: err.response?.data.message || "Something went wrong",
    });
  }
};

export const updateOrder = async (
  dispatch: Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  id: string,
  actionType: "on-the-way" | "delivered"
) => {
  try {
    dispatch({ type: OrderActionKind.UPDATE_ORDER_START });
    const { data } = await axiosPrivate.patch(`orders/${id}/${actionType}`);

    dispatch({
      type: OrderActionKind.UPDATE_ORDER_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    toast.error(err.response?.data.message || "Something went wrong");
  }
};

////////////////////////////////////////////////////////////////
export const getUserOrders = async (
  dispatch: Dispatch<OrderAction>,
  axiosPrivate: AxiosInstance,
  id: string
) => {
  try {
    const { data } = await axiosPrivate(`orders/user/${id}`);

    dispatch({
      type: OrderActionKind.GET_USER_ORDERS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: OrderActionKind.GET_USER_ORDERS_FAILURE,
      error: err.response?.data.message || "Something went wrong",
    });
  }
};

export const placeOrder = async (
  axiosPrivate: AxiosInstance,
  order: OrderDataProps
) => {
  try {
    const { data } = await axiosPrivate(`orders/stripe-publishable-key`);

    // 1) Get checkout session from API
    const session = await axiosPrivate.post(`orders/checkout-session`, order);

    // 2) Create checkout form + charge credit card
    const stripe = await loadStripe(data.publishableKey);
    stripe?.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
  }
};
