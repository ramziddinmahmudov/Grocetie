import ReactDOM from "react-dom";
import Counter from "../UI/Counter";
import CloseIcon from "../UI/Icons/CloseIcon";
import RatingsStars from "../UI/RatingsStars";
import { ProductItemTypes } from "../../utils/user-types";
import { useContext, useState } from "react";
import { addToWishlist, removeFromWishlist } from "../../api/user";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext } from "../../store/UserContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const QuickViewOverlay = ({ closeModal, item }: QuickViewModalProps) => {
  const navigate = useNavigate();
  const [wishlistUpdated, setWishlistUpdated] = useState<boolean>(false);
  const { state, dispatch } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();

  /// Calculate discountPercent
  let discountPercent: number = 0;
  if (item.discountedPrice > 0) {
    const priceGap = item.price - item.discountedPrice;
    discountPercent = priceGap / (item.price / 100);
  }

  const onToggleWishlist = async () => {
    if (state.user) {
      const added = state.user?.wishlisted.includes(item._id);
      setWishlistUpdated(true);
      if (added) await removeFromWishlist(dispatch, axiosPrivate, item._id);
      else await addToWishlist(dispatch, axiosPrivate, item._id);
      setWishlistUpdated(false);
    } else navigate("/auth/signin");
  };

  return (
    <div className="quick-view">
      <div className="quick-view__close" onClick={closeModal}>
        <CloseIcon />
      </div>
      <div className="product__info">
        <div className="product__info--item">
          <div className="product__info--title">
            {item.brandName ? `[${item.brandName}]` : ""} {item.name}{" "}
            {item.features ? item.features : ""}{" "}
            {item.weight ? item.weight : ""}
          </div>
          <div className="product__info--ratings">
            <RatingsStars
              ratingsAverage={item.ratingsAverage}
              ratingsQuantity={item.ratingsQuantity}
            />
          </div>
          <div className="product__info--price">
            {item.discountedPrice > 0 && (
              <>
                <del className="discounted-price">${item.price.toFixed(2)}</del>
                <h2>${item.discountedPrice.toFixed(2)}</h2>
                <span className="sale-off">
                  {Math.round(discountPercent)}% Off
                </span>
              </>
            )}

            {!item.discountedPrice && <h2>${item.price}</h2>}
          </div>
        </div>
        <div className="product__info--item">
          <p className="description">{item.description}</p>
        </div>
        <div className="product__info--item">
          <div className="product__info--action">
            <Counter id={item._id} inStock={item.inStock} />

            <button
              className="wishlist"
              onClick={onToggleWishlist}
              disabled={wishlistUpdated && true}
            >
              {state.user?.wishlisted.includes(item._id) ? (
                <FavoriteIcon className="full-icon" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
          </div>
        </div>
        <div className="product__info--item">
          <div className="product__info--last">
            <h5>
              Category: <span>{item.category.name}</span>
            </h5>
            <h5>
              Store: <span>{item.store}</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = ({ closeModal, item }: QuickViewModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <QuickViewOverlay closeModal={closeModal} item={item} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface QuickViewModalProps {
  closeModal: () => void;
  item: ProductItemTypes;
}

export default QuickViewModal;
