import { UserAction, UserActionKind } from "../store/UserContext";
import { toast } from "react-toastify";
import PhoneNumber, { CountryCode } from "libphonenumber-js";
import { AddressItemTypes, User } from "../utils/user-types";
import { ActionTypeProps } from "../utils/types";
import { AxiosInstance } from "axios";
import { Dispatch, RefObject } from "react";

export const getCountryCode = async (
  setCountryCode: (code: CountryCode | undefined) => void
) => {
  try {
    // Fetch the user's IP-based location
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    setCountryCode(data.country);
  } catch (error) {
    console.error("Error fetching country:", error);
  }
};

export const getMe = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance
) => {
  try {
    dispatch({ type: UserActionKind.GETME_START });
    const { data } = await axiosPrivate.get("/users/me");
    dispatch({ type: UserActionKind.GETME_SUCCESS, payload: data.user });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({ type: UserActionKind.GETME_FAILURE, error });
    toast.error(error);
  }
};

export const updateMe = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance,
  userData: {
    phoneNumber: string | undefined;
    name: string | undefined;
    username: string | undefined;
    email: string | undefined;
    photoRef: RefObject<HTMLInputElement>;
    countryCode: CountryCode | undefined;
  }
) => {
  const validatePhoneNumber = (number: string, code: CountryCode) => {
    return PhoneNumber(number, code)!.isValid() ? true : false;
  };

  const { phoneNumber, name, username, email, photoRef, countryCode } =
    userData;

  // Check if phonenumber is in correct format.
  if (phoneNumber && !validatePhoneNumber(phoneNumber, countryCode!)) {
    toast.warning("Please enter a valid phone number.");
    return;
  }

  const formData = new FormData();
  formData.append("phoneNumber", phoneNumber ? (phoneNumber as string) : "");
  formData.append("name", name as string);
  formData.append("username", username as string);
  formData.append("email", email as string);
  const userPhoto = photoRef.current?.files![0]
    ? (photoRef.current.files[0] as Blob)
    : "";
  formData.append("photo", userPhoto);

  try {
    dispatch({ type: UserActionKind.UPDATE_ME_START });

    const { data } = await axiosPrivate.patch("/users/updateMe", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: UserActionKind.UPDATE_ME_SUCCESS, payload: data.user });
    toast.success("Your data's been successfully updated.");
  } catch (err: any) {
    dispatch({
      type: UserActionKind.UPDATE_ME_FAILURE,
      error: err.response?.data.message,
    });
    const error = err.response?.data.message || "Something went wrong.";
    toast.error(error);
  }
};

export const addDeleteUpdateAddress = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance,
  actionType: ActionTypeProps,
  user: User,
  addressRefs: {
    nameRef: RefObject<HTMLInputElement>;
    cityRef: RefObject<HTMLInputElement>;
    address1Ref: RefObject<HTMLInputElement>;
    address2Ref: RefObject<HTMLInputElement>;
    postalCodeRef: RefObject<HTMLInputElement>;
    phoneNumber: string;
    countryCode: CountryCode;
  },
  addressItem: AddressItemTypes,
  closeModal: () => void
) => {
  const validatePhoneNumber = (number: string, code: CountryCode) => {
    return PhoneNumber(number, code)!.isValid() ? true : false;
  };

  if (!user) return;

  // 1. Get all values from input
  const name = addressRefs.nameRef.current?.value!;
  const city = addressRefs.cityRef.current?.value!;
  const address1 = addressRefs.address1Ref.current?.value!;
  const address2 = addressRefs.address2Ref.current?.value!;
  const postalCode = Number(addressRefs.postalCodeRef.current?.value!);

  let newAddresses: AddressItemTypes[] = [];

  // Check if phonenumber is in correct format.
  if (
    addressRefs.phoneNumber &&
    !validatePhoneNumber(addressRefs.phoneNumber, addressRefs.countryCode!)
  ) {
    toast.error("Please enter a valid phone number.");
    return;
  }

  const newAddress: AddressItemTypes = {
    name,
    phoneNumber: addressRefs.phoneNumber,
    city,
    address1,
    address2,
    postalCode,
  };

  switch (actionType) {
    case "delete":
      newAddresses = user.addresses.filter(
        (item) => item._id !== addressItem?._id
      );
      break;

    case "add":
      user.addresses.length > 0
        ? (newAddresses = [...user?.addresses!, newAddress])
        : (newAddresses = [newAddress]);
      break;

    case "update":
      if (user.addresses.length === 1) newAddresses = [newAddress];
      else if (user.addresses.length > 1) {
        // Find the index of the updating address and replaces it with new updated address
        const updatingAddressIndex = user.addresses.findIndex(
          (item) => item._id === addressItem?._id
        );
        const userAddressesCopy = [...user.addresses];
        userAddressesCopy[updatingAddressIndex] = newAddress;
        newAddresses = userAddressesCopy;
      }
      break;
    default:
      break;
  }

  try {
    dispatch({ type: UserActionKind.UPDATE_ME_START });
    const { data } = await axiosPrivate.patch("users/updateMe", {
      addresses: newAddresses,
    });

    dispatch({ type: UserActionKind.UPDATE_ME_SUCCESS, payload: data.user });
    toast.success("Your data's been successfully updated.");
    closeModal();
  } catch (err: any) {
    dispatch({
      type: UserActionKind.UPDATE_ME_FAILURE,
      error: err.response?.data.message,
    });
    const error = err.response?.data.message || "Something went wrong.";
    toast.error(error);
  }
};

export const getCompareOrWishlist = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance,
  type: "compare" | "wishlisted"
) => {
  try {
    const { data } = await axiosPrivate.get(`/users/me/${type}`);

    dispatch({
      type: UserActionKind.GET_COMPARE_OR_WISHLIST_SUCCESS,
      payload: { data: data.data, type },
    });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({ type: UserActionKind.GET_COMPARE_OR_WISHLIST_FAILURE, error });
  }
};

export const addToWishlist = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance,
  productId: string
) => {
  try {
    dispatch({ type: UserActionKind.ADD_TO_WISHLIST, payload: productId });
    await axiosPrivate.patch("/users/me/wishlisted/add", { productId });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({ type: UserActionKind.ADD_TO_WISHLIST_FAIL, error });
    toast.error(error);
  }
};

export const removeFromWishlist = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance,
  productId: string
) => {
  try {
    dispatch({ type: UserActionKind.REMOVE_FROM_WISHLIST, payload: productId });
    await axiosPrivate.patch("/users/me/wishlisted/remove", { productId });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({
      type: UserActionKind.REMOVE_FROM_WISHLIST_FAIL,
      payload: productId,
      error,
    });
    toast.error(error);
  }
};

export const addToCompare = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance,
  id: string
) => {
  try {
    dispatch({ type: UserActionKind.ADD_TO_COMPARE, payload: id });
    await axiosPrivate.patch("/users/me/compare/add", {
      productId: id,
    });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({ type: UserActionKind.ADD_TO_COMPARE_FAIL, error });
    toast.error(error);
  }
};

export const removeFromCompare = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance,
  id: string
) => {
  try {
    dispatch({ type: UserActionKind.REMOVE_FROM_COMPARE, payload: id });
    await axiosPrivate.patch("/users/me/compare/remove", {
      productId: id,
    });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    dispatch({
      type: UserActionKind.REMOVE_FROM_COMPARE_FAIL,
      payload: id,
      error,
    });
    toast.error(error);
  }
};

export const makeMeManager = async (
  dispatch: Dispatch<UserAction>,
  axiosPrivate: AxiosInstance,
  id: string,
  role: "user" | "manager"
) => {
  try {
    await axiosPrivate.patch(`/users/${id}/update-to-manager`, { role });
    dispatch({ type: UserActionKind.TOGGLE_CUSTOMER_ROLE, payload: role });
  } catch (err: any) {
    const error = err.response?.data.message || "Something went wrong.";
    toast.error(error);
  }
};
