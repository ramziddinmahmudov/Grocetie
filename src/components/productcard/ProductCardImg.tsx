import { useContext, useState } from "react";
import CompareIcon from "../UI/Icons/CompareIcon";
import QuickViewModal from "../modals/QuickViewModal";
import { Link, useNavigate } from "react-router-dom";
import {
  addToCompare,
  addToWishlist,
  removeFromCompare,
  removeFromWishlist,
} from "../../api/user";
import { UserContext } from "../../store/UserContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import CompareIconFull from "../UI/Icons/CompareIconFull";
import { ProductItemTypes } from "../../utils/user-types";

const ProductCardImg = ({ item }: { item: ProductItemTypes }) => {
  const navigate = useNavigate();
  const [wishlistUpdated, setWishlistUpdated] = useState<boolean>(false);
  const [compareUpdated, setCompareUpdated] = useState<boolean>(false);
  const [showQuickView, setShowQuickView] = useState<boolean>(() => false);
  const { state, dispatch } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();

  const onToggleWishlist = async () => {
    if (state.user) {
      const added = state.user?.wishlisted.includes(item._id);
      setWishlistUpdated(true);
      if (added) await removeFromWishlist(dispatch, axiosPrivate, item._id);
      else await addToWishlist(dispatch, axiosPrivate, item._id);
      setWishlistUpdated(false);
    } else navigate("/auth/signin");
  };

  const onToggleCompare = async () => {
    if (state.user) {
      const added = state.user?.compare.includes(item._id);
      setCompareUpdated(true);
      if (added) await removeFromCompare(dispatch, axiosPrivate, item._id);
      else await addToCompare(dispatch, axiosPrivate, item._id);
      setCompareUpdated(false);
    } else navigate("/auth/signin");
  };

  return (
    <>
      {showQuickView && (
        <QuickViewModal
          closeModal={() => setShowQuickView(false)}
          item={item}
        />
      )}
      <div className="product-item__img-box">
        <Link to={`/products/${item._id}`}>
          <img
            className="product-item__img"
            src={item.images[0].imageUrl}
            alt=""
          />
          {!item.inStock && (
            <div className="stock-out product-item__stock-out">
              Out of stock
            </div>
          )}
        </Link>
        <div className="favs">
          <button
            className="favs-item"
            onClick={onToggleWishlist}
            disabled={wishlistUpdated && true}
          >
            {state.user?.wishlisted.includes(item._id) ? (
              <FavoriteIcon className="full-icon" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
          <div className="favs-item" onClick={() => setShowQuickView(true)}>
            <svg>
              <use href="/assets/icons/icons.svg#icon-eye"></use>
            </svg>
          </div>
          <button
            className="favs-item"
            onClick={onToggleCompare}
            disabled={compareUpdated && true}
          >
            {state.user?.compare.includes(item._id) ? (
              <CompareIconFull />
            ) : (
              <CompareIcon />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCardImg;
