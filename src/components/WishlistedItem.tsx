import { useContext, useState } from "react";
import useAxiosPrivate from "../hooks/auth/useAxiosPrivate";
import { UserContext } from "../store/UserContext";
import { removeFromWishlist } from "../api/user";
import LoadingCounterSpinner from "./UI/Icons/LoadingCounterSpinner";
import { addToCart } from "../api/cart";
import { CartContext } from "../store/CartContext";
import LoadingButtonSpinner from "./UI/Icons/LoadingButtonSpinner";
import { Link } from "react-router-dom";

const WishlistedItem = ({
  name,
  price,
  discountedPrice,
  inStock,
  image,
  id,
}: WishlistedItemProps) => {
  const [addToCartLoading, setAddToCartLoading] = useState<boolean>(false);
  const [wishlistUpdated, setWishlistUpdated] = useState<boolean>(false);
  const { dispatch } = useContext(UserContext);
  const { state, dispatch: cartDispatch } = useContext(CartContext);
  const axiosPrivate = useAxiosPrivate();

  const onAddToCart = async () => {
    if (state.updateLoading) return;
    await addToCart(cartDispatch, id, 1, axiosPrivate, setAddToCartLoading);
  };

  const onRemoveFromWishlist = async () => {
    setWishlistUpdated(true);
    setTimeout(
      async () => await removeFromWishlist(dispatch, axiosPrivate, id),
      300
    );
    setTimeout(() => setWishlistUpdated(false), 301);
  };

  return (
    <tr className="wishlist__item">
      <td className="wishlist__item--product">
        <Link to={`/products/${id}`} className="wishlist__item--image">
          <img src={image} alt="" />
        </Link>
        <h5>{name}</h5>
      </td>
      <td className="wishlist__item--price">
        <p>
          {discountedPrice > 0 ? (
            <>
              ${discountedPrice.toFixed(2)} <del>${price.toFixed(2)}</del>
            </>
          ) : (
            "$" + price.toFixed(2)
          )}
        </p>
      </td>
      <td className="wishlist__item--stock">
        {inStock && <span className="stock-in">in Stock</span>}
        {!inStock && <span className="stock-out">out of stock</span>}
      </td>
      <td className="wishlist__item--actions">
        <button
          className="button button-md"
          disabled={!inStock && true}
          onClick={onAddToCart}
          children={addToCartLoading ? <LoadingButtonSpinner /> : "Add to Cart"}
        />
        <button
          className="delete-item"
          disabled={wishlistUpdated && true}
          onClick={onRemoveFromWishlist}
        >
          {wishlistUpdated ? (
            <LoadingCounterSpinner />
          ) : (
            <img src="/assets/icons/delete-icon.svg" alt="" />
          )}
        </button>
      </td>
    </tr>
  );
};

interface WishlistedItemProps {
  name: string;
  price: number;
  discountedPrice: number;
  inStock: boolean;
  image: string;
  id: string;
}

export default WishlistedItem;
