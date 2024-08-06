import { ProductAction, ProductActionKind } from "../store/ProductContext";
import { toast } from "react-toastify";
import { ImageItemTypes, ProductItemTypes } from "../utils/user-types";
import { determineImageUploadConditions } from "./helper";
import axios from "./axios";
import { NavigateFunction } from "react-router-dom";
import { AxiosInstance } from "axios";
import { Dispatch } from "react";

export const getProducts = async (
  dispatch: Dispatch<ProductAction>,
  query?: string
) => {
  try {
    dispatch({ type: ProductActionKind.GET_PRODUCTS_START });
    const { data } = await axios(`/products${query}`);

    dispatch({
      type: ProductActionKind.GET_PRODUCTS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.GET_PRODUCTS_FAILURE,
      error: err.response?.data.message || "Something went wrong.",
    });
  }
};

export const getCustomProducts = async (
  dispatch: Dispatch<ProductAction>,
  type: "relatedProducts" | "topProducts" | "saleProducts" | "searchProducts",
  query?: string
) => {
  try {
    dispatch({
      type: ProductActionKind.GET_CUSTOM_PRODUCTS_START,
      payload: { type },
    });

    const { data } = await axios(`/products${query}`);

    dispatch({
      type: ProductActionKind.GET_CUSTOM_PRODUCTS_SUCCESS,
      payload: { products: data.data, type },
    });
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.GET_CUSTOM_PRODUCTS_FAILURE,
      payload: { type },
    });
  }
};

export const getProduct = async (
  dispatch: Dispatch<ProductAction>,
  id: string,
  navigate: NavigateFunction
) => {
  try {
    dispatch({ type: ProductActionKind.GET_PRODUCT_START });
    const { data } = await axios(`/products/${id}`);

    dispatch({
      type: ProductActionKind.GET_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    if (err.response?.status === 404) {
      navigate("/shop");
      toast.error("No product found with that id.");
      return;
    }
    dispatch({
      type: ProductActionKind.GET_PRODUCT_FAILURE,
      error: err.response?.data.message || "Something went wrong.",
    });
  }
};

export const addProduct = async (
  dispatch: Dispatch<ProductAction>,
  axiosPrivate: AxiosInstance,
  formData: FormData,
  imagesForServer: FileList | [],
  closeModal: () => void
) => {
  for (let i = 0; i < imagesForServer.length; i++) {
    formData.append("images", imagesForServer[i] as Blob);
  }

  try {
    dispatch({ type: ProductActionKind.ADD_PRODUCT_START });

    const { data } = await axiosPrivate.post(`/products`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({
      type: ProductActionKind.ADD_PRODUCT_SUCCESS,
      payload: data.data,
    });
    closeModal();

    toast.success("New Product has been successfully added.");
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.ADD_PRODUCT_FAILURE,
      error: err.response?.data.message || "Something went wrong.",
    });
  }
};

export const updateProduct = async (
  dispatch: Dispatch<ProductAction>,
  axiosPrivate: AxiosInstance,
  formData: FormData,
  imagesForServer: FileList | [],
  imagesForClient: ImageItemTypes[],
  closeModal: () => void,
  product: ProductItemTypes
) => {
  if (imagesForServer.length === 0 && imagesForClient.length === 0) {
    toast.error("Please upload at least one image.");
    return;
  }

  // This function determines how the user updated the images of the item and return formdata based on the way of change.
  const updatedFormData = determineImageUploadConditions(
    imagesForServer,
    imagesForClient,
    product,
    formData
  );

  updatedFormData.append("reviewsCount", String(product.reviewsCount));

  try {
    dispatch({ type: ProductActionKind.UPDATE_PRODUCT_START });

    const { data } = await axiosPrivate.patch(
      `/products/${product._id}`,
      updatedFormData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch({
      type: ProductActionKind.UPDATE_PRODUCT_SUCCESS,
      payload: data.data,
    });
    closeModal();
    toast.success("Product has been successfully updated.");
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.UPDATE_PRODUCT_FAILURE,
      error: err.response?.data.message || "Something went wrong.",
    });
  }
};

export const deleteProduct = async (
  dispatch: Dispatch<ProductAction>,
  axiosPrivate: AxiosInstance,
  closeModal: () => void,
  id: string,
  navigate: (arg: string) => void
) => {
  try {
    dispatch({ type: ProductActionKind.DELETE_PRODUCT_START });
    await axiosPrivate.delete(`/products/${id}`);

    dispatch({ type: ProductActionKind.DELETE_PRODUCT_SUCCESS });
    closeModal();
    toast.success("Product has been deleted");
    navigate("/shop");
  } catch (err: any) {
    dispatch({
      type: ProductActionKind.DELETE_PRODUCT_FAILURE,
      error: err.response?.data.message || "Something went wrong.",
    });
  }
};
