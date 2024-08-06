import { useContext, useLayoutEffect, useRef, useState } from "react";
import ReviewItem from "./ReviewItem";
import HoverRating from "../product-details/HoverRating";
import { addReview, getProductReviews } from "../../api/reviews";
import { ProductContext } from "../../store/ProductContext";
import { useParams } from "react-router-dom";
import { UserContext } from "../../store/UserContext";
import LoadingButtonSpinner from "../UI/Icons/LoadingButtonSpinner";
import LoadingSpinner from "../UI/LoadingSpinner";
import { ReviewContext } from "../../store/ReviewsContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const ReviewsList = ({ show }: { show: boolean }) => {
  const [page, setPage] = useState<number>(1);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>(4.5);
  const reviewRef = useRef<HTMLTextAreaElement>(null);
  const { productId } = useParams();
  const {
    state: { product },
    dispatch: productDispatch,
  } = useContext(ProductContext);
  const {
    state: { reviews, loading },
    dispatch,
  } = useContext(ReviewContext);
  const axiosPrivate = useAxiosPrivate();
  const { state: userState } = useContext(UserContext);

  useLayoutEffect(() => {
    (async () => {
      page !== 1 && setMoreLoading(true);
      await getProductReviews(
        dispatch,
        productId as string,
        page,
        userState.user?._id
      );
      page !== 1 && setMoreLoading(false);
    })();
  }, [dispatch, productId, page, userState.user?._id]);

  const onAddReview = async () => {
    const reviewData = {
      review: reviewRef.current?.value as string,
      rating: value as number,
      product: productId as string,
    };

    await addReview(
      dispatch,
      axiosPrivate,
      productDispatch,
      reviewData,
      product?.reviewsCount as number
    );
    setValue(4.5);
  };

  if (loading) return <LoadingSpinner minHeight={false} />;

  const hasReview = reviews?.find((i) => i.user._id === userState.user?._id);
  const hasBought = userState.user?.orderedProducts.find(
    (i) => i === productId
  );

  return (
    <div style={{ display: show ? "block" : "none" }}>
      <div className="reviews__main">
        <div className="container">
          <div className="reviews">
            {reviews?.map((item) => (
              <ReviewItem
                review={item}
                key={item._id}
                user={{
                  id: userState.user?._id || "",
                  role: userState.user?.role || "",
                }}
              />
            ))}
            {reviews?.length === 0 && (
              <div className="reviews__empty">
                <h2>No reviews yet</h2>
              </div>
            )}
            {reviews &&
              !((product?.reviewsCount as number) <= reviews.length) && (
                <div className="reviews__load-more">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={moreLoading && true}
                    children={moreLoading ? "Loading..." : "Load more"}
                  />
                </div>
              )}
          </div>
        </div>
      </div>

      {!hasReview && (
        <>
          {hasBought && (
            <div className="add-review input no-border">
              <label htmlFor="review">Add Review</label>
              <HoverRating value={value} setValue={setValue} />
              <textarea
                id="review"
                placeholder="Please share your experience..."
                ref={reviewRef}
              />
              <button
                className="button button-md"
                onClick={onAddReview}
                disabled={loading && true}
                children={loading ? <LoadingButtonSpinner /> : "Post Review"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsList;
