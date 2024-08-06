import { ReviewReplyItemTypes } from "../../utils/user-types";
import { formatDate } from "../../utils/helperFunctions";
import WarningModal from "../modals/WarningModal";
import { useContext, useRef, useState } from "react";
import LoadingButtonSpinner from "../UI/Icons/LoadingButtonSpinner";
import {
  addReviewReply,
  deleteReviewReply,
  editReviewReply,
} from "../../api/reviews";
import { ReviewContext } from "../../store/ReviewsContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const ReplyItem = ({
  reply,
  user,
  review,
}: {
  reply: ReviewReplyItemTypes;
  user: { id: string; role: string };
  review: { id: string; userId: string };
}) => {
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [replyOpen, setReplyOpen] = useState<boolean>(false);
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const { dispatch } = useContext(ReviewContext);
  const axiosPrivate = useAxiosPrivate();

  const onAddReply = async () => {
    const reviewData = {
      text: replyRef.current?.value as string,
      user: user.id as string,
    };

    await addReviewReply(dispatch, axiosPrivate, reviewData, review.id);
    setReplyOpen(false);
  };

  const onEditReply = async () => {
    await editReviewReply(
      dispatch,
      axiosPrivate,
      replyRef.current?.value as string,
      review.id,
      reply._id
    );
    setEditOpen(false);
  };

  const onDeleteReply = async (setLoading: (arg: boolean) => void) => {
    setLoading(true);
    await deleteReviewReply(dispatch, axiosPrivate, review.id, reply._id);
    setLoading(false);
    setWarningModal(false);
  };

  const onToggleEdit = () => {
    setEditOpen((prev) => !prev);
    setReplyOpen(false);
  };

  const onToggleReply = () => {
    setReplyOpen((prev) => !prev);
    setEditOpen(false);
  };

  const onCloseModal = (arg: boolean) => setWarningModal(arg);

  return (
    <>
      {warningModal && (
        <WarningModal
          closeModal={onCloseModal.bind(null, false)}
          text={"Are you sure that you want to delete this review reply?"}
          actionHandler={onDeleteReply}
        />
      )}
      <div className="review">
        <div className="review__top">
          <div className="user-details">
            <div className="user-details__img">
              <img src={reply.user.photo} alt="User" />
            </div>
            <div className="user-details__info">
              <h2>
                {reply.user.name}{" "}
                {["admin", "manager"].includes(reply.user.role)
                  ? `(${reply.user.role})`
                  : ""}
              </h2>
              <h2>@{reply.user.username}</h2>
            </div>
          </div>
          <div className="review__top--time">
            <p>{formatDate(reply.createdAt)}</p>
          </div>
        </div>
        <p>{reply.text}</p>

        <div className="review__actions">
          {/* We only allow the reply owner to change or delete their reply. */}
          {reply.user._id === user.id && (
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

          {/* First: we restrict the user from replying to themselves. */}
          {reply.user._id !== user.id &&
            // Second: we only allow the review owner, admin and manager to reply.
            (review.userId === user.id ||
              ["admin", "manager"].includes(user.role)) && (
              <button
                onClick={onToggleReply}
                className="edit"
                children={replyOpen ? "Close" : "Reply"}
              />
            )}
        </div>

        {!replyOpen && editOpen && (
          <div className="add-review input">
            <textarea
              id="review"
              placeholder="Please share your experience..."
              ref={replyRef}
              defaultValue={reply.text}
            />

            <button
              className="button button-md"
              onClick={onEditReply}
              disabled={false && true}
              children={"" ? <LoadingButtonSpinner /> : "Save Reply"}
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
      </div>
    </>
  );
};

export default ReplyItem;
