import { toast } from "react-toastify";
import { NewsAction, NewsActionKind } from "../store/NewsContext";
import { ImageItemTypes, NewsItemTypes } from "../utils/user-types";
import { determineImageUploadConditions } from "./helper";
import axios from "./axios";
import { AxiosInstance } from "axios";
import { Dispatch } from "react";

export const getAllNews = async (dispatch: Dispatch<NewsAction>) => {
  try {
    const { data } = await axios("news?sort=createdAt&limit=20");

    dispatch({
      type: NewsActionKind.GET_NEWS_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({ type: NewsActionKind.GET_NEWS_FAILURE, error });
  }
};

export const getNewsItem = async (
  dispatch: Dispatch<NewsAction>,
  id: string
) => {
  try {
    const { data } = await axios(`/news/${id}`);

    dispatch({
      type: NewsActionKind.GET_NEWSITEM_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({ type: NewsActionKind.GET_NEWSITEM_FAILURE, error });
  }
};

export const addNews = async (
  dispatch: Dispatch<NewsAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  closeModal: () => void,
  axiosPrivate: AxiosInstance
) => {
  for (let i = 0; i < imagesForServer.length; i++) {
    formData.append("images", imagesForServer[i] as Blob);
  }

  try {
    dispatch({ type: NewsActionKind.ADD_NEWSITEM_START });

    const { data } = await axiosPrivate.post(`/news`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({
      type: NewsActionKind.ADD_NEWSITEM_SUCCESS,
      payload: data.data,
    });
    toast.success("News has been successfully added.");
    closeModal();
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({ type: NewsActionKind.ADD_NEWSITEM_FAILURE, error });
  }
};

export const updateNews = async (
  dispatch: Dispatch<NewsAction>,
  formData: FormData,
  imagesForServer: FileList | [],
  imagesForClient: ImageItemTypes[],
  closeModal: () => void,
  news: NewsItemTypes | undefined,
  axiosPrivate: AxiosInstance
) => {
  if (imagesForServer.length === 0 && imagesForClient.length === 0) {
    toast.error("Please upload at least one image.");
    return;
  }

  // This function determines how the user updated the images of the item and return formdata based on the way of change.
  const updatedFormData = determineImageUploadConditions(
    imagesForServer,
    imagesForClient,
    news,
    formData
  );

  try {
    dispatch({ type: NewsActionKind.UPDATE_NEWSITEM_START });

    const { data } = await axiosPrivate.patch(
      `/news/${news?._id}`,
      updatedFormData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch({
      type: NewsActionKind.UPDATE_NEWSITEM_SUCCESS,
      payload: data.data,
    });
    closeModal();
    toast.success("News has been successfully updated.");
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({ type: NewsActionKind.UPDATE_NEWSITEM_FAILURE, error });
  }
};

export const deleteNews = async (
  dispatch: Dispatch<NewsAction>,
  id: string | undefined,
  closeModal: () => void,
  navigate: (arg: string) => void,
  axiosPrivate: AxiosInstance
) => {
  try {
    dispatch({ type: NewsActionKind.DELETE_NEWSITEM_START });

    await axiosPrivate.delete(`/news/${id}`);

    dispatch({ type: NewsActionKind.DELETE_NEWSITEM_SUCCESS });
    toast.success("News has been successfully deleted.");
    closeModal();
    navigate("/news");
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong";
    dispatch({ type: NewsActionKind.DELETE_NEWSITEM_FAILURE, error });
  }
};
