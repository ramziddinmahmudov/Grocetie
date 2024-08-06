import { useContext, useRef, useState } from "react";
import { formatDate } from "../../utils/helperFunctions";
import { ReviewItemTypes } from "../../utils/user-types";
import RatingsStars from "../UI/RatingsStars";
import HoverRating from "../product-details/HoverRating";
import { useParams } from "react-router-dom";
import LoadingButtonSpinner from "../UI/Icons/LoadingButtonSpinner";
import { addReviewReply, deleteReview, editReview } from "../../api/reviews";
import WarningModal from "../modals/WarningModal";
import ReplyItem from "./ReplyItem";
import { ReviewContext } from "../../store/ReviewsContext";
import { ProductContext } from "../../store/ProductContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const ReviewItem = ({
  review,
  user,
}: {
  review: ReviewItemTypes;
  user: { id: string; role: string };
}) => {
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [value, setValue] = useState<number | null>();
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const { productId } = useParams();
  const { dispatch } = useContext(ReviewContext);
  const axiosPrivate = useAxiosPrivate();
  const { state, dispatch: productDispatch } = useContext(ProductContext);

  const onEditReview = async () => {
    const reviewData = {
      review: reviewRef.current?.value as string,
      rating: (value as number) || review.rating,
      product: productId as string,
    };

    await editReview(
      dispatch,
      axiosPrivate,
      productDispatch,
      reviewData,
      review._id,
      state.product?.reviewsCount as number
    );
    setEditOpen(false);
  };

  const onDeleteReview = async (setLoading: (arg: boolean) => void) => {
    setLoading(true);
    await deleteReview(
      dispatch,
      axiosPrivate,
      productDispatch,
      review._id,
      state.product?.reviewsCount as number
    );
    setLoading(false);
    setWarningModal(false);
  };

  const onAddReply = async () => {
    const reviewData = {
      text: replyRef.current?.value as string,
      user: user.id as string,
    };

    await addReviewReply(dispatch, axiosPrivate, reviewData, review._id);
    setReplyOpen(false);
    setShowReplies(true);
  };

  const onToggleEdit = () => {
    setEditOpen((prev) => !prev);
    setReplyOpen(false);
    setValue(null);
  };

  const onToggleReply = () => {
    setReplyOpen((prev) => !prev);
    setEditOpen(false);
  };

  const onCloseModal = (arg: boolean) => setWarningModal(arg);

  // If the user's replied before, we allow the admin to only reply to the user's reply.
  const hasUserAlreadyAddReply = review.replies.some(
    (i) => i.user._id === review.user._id
  );

  return (
    <>
      {warningModal && (
        <WarningModal
          closeModal={onCloseModal.bind(null, false)}
          text={"Are you sure that you want to delete this review?"}
          actionHandler={onDeleteReview}
        />
      )}

      <div className="review">
        <div className="review__top">
          <div className="user-details">
            <div className="user-details__img">
              <img src={review.user.photo} alt="User" />
            </div>
            <div className="user-details__info">
              <h2>{review.user.name}</h2>
              <RatingsStars
                notRatingsQuantity={true}
                ratingsAverage={review.rating}
              />
            </div>
          </div>
          <div className="review__top--time">
            <p>{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <p>{review.review}</p>

        <div className="review__actions">
          {/* We only allow the review owner to change or delete their review. */}
          {review.user._id === user.id && (
            <>
              <button
                className="delete"
                onClick={onCloseModal.bind(null, true)}
                children="Delete"
              />

              <button
                onClick={onToggleEdit}
                className="edit"
                children={editOpen ? "Close" : "Edit"}
              />
            </>
          )}

          {/* We restrict the user from replying to themselves. */}
          {user.role === "admin" && !hasUserAlreadyAddReply && (
            <button
              onClick={onToggleReply}
              className="edit"
              children={replyOpen ? "Close" : "Reply"}
            />
          )}
        </div>

        {editOpen && !replyOpen && (
          <div className="add-review input">
            <HoverRating
              value={value ? value : review.rating}
              setValue={setValue}
            />
            <textarea
              id="review"
              placeholder="Please share your experience..."
              ref={reviewRef}
              defaultValue={review.review}
            />

            <button
              className="button button-md"
              onClick={onEditReview}
              disabled={false && true}
              children={"" ? <LoadingButtonSpinner /> : "Edit Review"}
            />
          </div>
        )}

        {replyOpen && !editOpen && (
          <div className="add-review input">
            <textarea
              id="review"
              placeholder="Please share your experience..."
              ref={replyRef}
            />

            <button
              className="button button-md"
              onClick={onAddReply}
              disabled={false && true}
              children={"" ? <LoadingButtonSpinner /> : "Add Reply"}
            />
          </div>
        )}

        {showReplies && review.replies?.length > 0 && (
          <div className="replies">
            <div className="replies__main">
              {review.replies.map((reply) => (
                <ReplyItem
                  key={reply._id}
                  reply={reply}
                  user={user}
                  review={{ id: review._id, userId: review.user._id }}
                />
              ))}
            </div>
          </div>
        )}

        {review.replies?.length > 0 && !showReplies && (
          <div className="view-replies">
            <h1 onClick={() => setShowReplies(true)}>
              View {review.replies.length} repl
              {review.replies.length > 1 ? "ies" : "y"}
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewItem;
