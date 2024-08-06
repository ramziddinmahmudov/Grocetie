import { toast } from "react-toastify";
import axios from "./axios";
import { ReviewAction, ReviewActionKind } from "../store/ReviewsContext";
import { ProductAction, ProductActionKind } from "../store/ProductContext";
import { AxiosInstance } from "axios";
import { Dispatch } from "react";

export const getProductReviews = async (
  dispatch: Dispatch<ReviewAction>,
  productId: string,
  page: number,
  userId: string = ""
) => {
  try {
    page === 1 && dispatch({ type: ReviewActionKind.GET_REVIEWS_START });
    const { data } = await axios(
      `products/${productId}/reviews?limit=5&sort=-createdAt&sort=-rating&page=${page}${
        userId ? `&userId=${userId}` : ""
      }`
    );

    dispatch({
      type: ReviewActionKind.GET_REVIEWS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    dispatch({
      type: ReviewActionKind.GET_REVIEWS_FAILURE,
      error,
    });

    toast.error(error);
  }
};

export const addReview = async (
  dispatch: Dispatch<ReviewAction>,
  axiosPrivate: AxiosInstance,
  productDispatch: Dispatch<ProductAction>,
  reviewData: { review: string; rating: number; product: string },
  reviewsCount: number
) => {
  try {
    const { data } = await axiosPrivate.post(`reviews`, reviewData);

    dispatch({
      type: ReviewActionKind.CREATE_REVIEW,
      payload: data.data.review,
    });

    productDispatch({
      type: ProductActionKind.UPDATE_PRODUCT_SUCCESS,
      payload: { ...data.data.product, reviewsCount: ++reviewsCount },
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";

    toast.error(error);
  }
};

export const editReview = async (
  dispatch: Dispatch<ReviewAction>,
  axiosPrivate: AxiosInstance,
  productDispatch: Dispatch<ProductAction>,
  reviewData: { review: string; rating: number; product: string },
  id: string,
  reviewsCount: number
) => {
  try {
    const { data } = await axiosPrivate.patch(`reviews/${id}`, reviewData);

    dispatch({
      type: ReviewActionKind.EDIT_REVIEW,
      payload: data.data.review,
    });

    productDispatch({
      type: ProductActionKind.UPDATE_PRODUCT_SUCCESS,
      payload: { ...data.data.product, reviewsCount },
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";

    toast.error(error);
  }
};

export const deleteReview = async (
  dispatch: Dispatch<ReviewAction>,
  axiosPrivate: AxiosInstance,
  productDispatch: Dispatch<ProductAction>,
  id: string,
  reviewsCount: number
) => {
  try {
    const { data } = await axiosPrivate.delete(`reviews/${id}`);

    dispatch({
      type: ReviewActionKind.DELETE_REVIEW,
      payload: data.data.reviewId,
    });

    productDispatch({
      type: ProductActionKind.UPDATE_PRODUCT_SUCCESS,
      payload: { ...data.data.product, reviewsCount: --reviewsCount },
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";

    toast.error(error);
  }
};

export const addReviewReply = async (
  dispatch: Dispatch<ReviewAction>,
  axiosPrivate: AxiosInstance,
  replyData: { text: string; user: string },
  reviewId: string
) => {
  try {
    const { data } = await axiosPrivate.post(
      `reviews/${reviewId}/replies`,
      replyData
    );

    dispatch({
      type: ReviewActionKind.CREATE_REPLY,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";

    toast.error(error);
  }
};

export const editReviewReply = async (
  dispatch: Dispatch<ReviewAction>,
  axiosPrivate: AxiosInstance,
  text: string,
  reviewId: string,
  replyId: string
) => {
  try {
    const { data } = await axiosPrivate.patch(
      `reviews/${reviewId}/replies/${replyId}`,
      { text }
    );

    dispatch({
      type: ReviewActionKind.EDIT_REPLY,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};

export const deleteReviewReply = async (
  dispatch: Dispatch<ReviewAction>,
  axiosPrivate: AxiosInstance,
  reviewId: string,
  replyId: string
) => {
  try {
    const { data } = await axiosPrivate.delete(
      `reviews/${reviewId}/replies/${replyId}`
    );

    dispatch({
      type: ReviewActionKind.DELETE_REPLY,
      payload: data.data,
    });
  } catch (err: any) {
    const error =
      err.response?.data.message ||
      "Something went wrong. Please come back later.";
    toast.error(error);
  }
};
