import { toast } from "react-toastify";
import { UserAction, UserActionKind } from "../store/UserContext";
import { AxiosInstance } from "axios";
import { Dispatch } from "react";

export const getCustomers = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance
) => {
  try {
    const { data } = await axiosPrivate("users");

    dispatch({
      type: UserActionKind.GET_CUSTOMERS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: UserActionKind.GET_CUSTOMERS_FAILURE,
      error: err.response?.data.message || "Something went wrong. ",
    });
  }
};

export const getCustomer = async (
  dispatch: Dispatch<UserAction>,
  id: string,
  axiosPrivate: AxiosInstance
) => {
  try {
    dispatch({ type: UserActionKind.GET_CUSTOMER_START });
    const { data } = await axiosPrivate(`/users/${id}`);

    dispatch({
      type: UserActionKind.GET_CUSTOMER_SUCCESS,
      payload: data.user,
    });
  } catch (err: any) {
    dispatch({
      type: UserActionKind.GET_CUSTOMER_FAILURE,
      error: err.response?.data.message || "Something went wrong.",
    });
  }
};

export const getCustomersStats = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance
) => {
  try {
    dispatch({ type: UserActionKind.GET_CUSTOMERS_STATS_START });
    const { data } = await axiosPrivate(`users/stats/customers`);

    dispatch({
      type: UserActionKind.GET_CUSTOMERS_STATS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    toast.error(err.response?.data.message || "Something went wrong.");
  }
};
