import { createContext, useReducer } from "react";
import { ReviewItemTypes } from "../utils/user-types";
import { removeDublicate, returnUpdatedState } from "../utils/helperFunctions";

interface ReviewsInitialStateTypes {
  reviews: ReviewItemTypes[] | null;
  loading: boolean;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum ReviewActionKind {
  GET_REVIEWS_START = "GET_REVIEWS_START",
  GET_REVIEWS_SUCCESS = "GET_REVIEWS_SUCCESS",
  GET_REVIEWS_FAILURE = "GET_REVIEWS_FAILURE",

  CREATE_REVIEW = "CREATE_REVIEW",

  EDIT_REVIEW = "EDIT_REVIEW",

  DELETE_REVIEW = "DELETE_REVIEW",

  CREATE_REPLY = "CREATE_REPLY",

  EDIT_REPLY = "EDIT_REPLY",

  DELETE_REPLY = "DELETE_REPLY",
}

// An interface for our actions
export interface ReviewAction {
  type: ReviewActionKind;
  payload?: ReviewItemTypes | ReviewItemTypes[] | [] | string;
  error?: string;
}

const INITIAL_STATE: ReviewsInitialStateTypes = {
  reviews: null,
  loading: false,
  error: null,
};

export interface ReviewContextTypes {
  state: ReviewsInitialStateTypes;
  dispatch: React.Dispatch<ReviewAction>;
}

export const ReviewContext = createContext<ReviewContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const ReviewReducer = (
  state: ReviewsInitialStateTypes,
  action: ReviewAction
): typeof INITIAL_STATE => {
  const stateReviews = state.reviews ? state.reviews : [];
  switch (action.type) {
    case ReviewActionKind.GET_REVIEWS_START:
      return { ...state, loading: true, reviews: [] };
    case ReviewActionKind.GET_REVIEWS_SUCCESS:
      const uniqueArr = removeDublicate([
        ...stateReviews,
        ...(action.payload as ReviewItemTypes[]),
      ]);
      return { ...state, reviews: uniqueArr, loading: false };
    case ReviewActionKind.GET_REVIEWS_FAILURE:
      return { ...state, loading: false };

    case ReviewActionKind.CREATE_REVIEW:
      stateReviews?.push(action.payload as ReviewItemTypes);
      return { ...state, reviews: stateReviews };

    case ReviewActionKind.EDIT_REVIEW:
      const review = action.payload as ReviewItemTypes;
      const updatedReviews = returnUpdatedState(
        state.reviews,
        review,
        review._id
      );

      return { ...state, reviews: updatedReviews };

    case ReviewActionKind.DELETE_REVIEW:
      return {
        ...state,
        reviews: stateReviews.filter((i) => i._id !== action.payload),
      };

    /////////////// REPLIES ///////////////
    case ReviewActionKind.CREATE_REPLY:
      const editedReview = action.payload as ReviewItemTypes;
      const updatedReviews2 = returnUpdatedState<ReviewItemTypes>(
        state.reviews,
        editedReview,
        editedReview._id
      );

      return { ...state, reviews: updatedReviews2 };

    case ReviewActionKind.EDIT_REPLY:
      const editedReview2 = action.payload as ReviewItemTypes;
      const updatedReviews3 = returnUpdatedState<ReviewItemTypes>(
        state.reviews,
        editedReview2,
        editedReview2._id
      );
      return { ...state, reviews: updatedReviews3 };

    case ReviewActionKind.DELETE_REPLY:
      const editedReview3 = action.payload as ReviewItemTypes;
      const updatedReviews4 = returnUpdatedState<ReviewItemTypes>(
        state.reviews,
        editedReview3,
        editedReview3._id
      );
      return { ...state, reviews: updatedReviews4 };

    default:
      return state;
  }
};

export const ReviewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ReviewReducer, INITIAL_STATE);

  const values = {
    state,
    dispatch,
  };

  return (
    <ReviewContext.Provider value={values}>{children}</ReviewContext.Provider>
  );
};
