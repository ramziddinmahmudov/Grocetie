import { useContext, useState } from "react";
import SocialShareModal from "../modals/SocialShareModal";
import { addToCart } from "../../api/cart";
import { CartContext } from "../../store/CartContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { toast } from "react-toastify";
import { addToWishlist, removeFromCompare } from "../../api/user";
import { UserContext } from "../../store/UserContext";

const ActionsBox = ({ id }: { id: string }) => {
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { state, dispatch } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();

  const onToggleOptions = () => {
    const boxes = document.querySelectorAll(".options-box");
    for (let box of boxes as NodeListOf<HTMLDivElement>) {
      if (box.dataset.id === id && !box.classList.contains("options-open")) {
        box.classList.add("options-open");
      } else box.classList.remove("options-open");
    }
  };

  const onAddToCart = async () => {
    await addToCart(cartDispatch, id, 1, axiosPrivate);
    toast.success("Added to cart.");
  };

  const onAddToWishlist = async () => {
    await addToWishlist(dispatch, axiosPrivate, id);
    toast.success("Added to wishlist.");
  };

  const onRemoveFromCompare = async () => {
    if (removeLoading) return;
    setRemoveLoading(true);
    await removeFromCompare(dispatch, axiosPrivate, id);
    setRemoveLoading(false);
  };

  return (
    <>
      {showShareModal && (
        <SocialShareModal
          closeModal={() => setShowShareModal(false)}
          text="product"
          url={`${window.location.origin}/products/${id}`}
        />
      )}
      <div className={`options-box`} onClick={onToggleOptions} data-id={id}>
        <div className="options-box__icon">
          <img src="/assets/icons/three-dots.svg" alt="" />
        </div>

        <ul className="options" data-id={id}>
          <li className="options__item" onClick={onRemoveFromCompare}>
            Remove
          </li>

          {!state.user?.wishlisted.includes(id) && (
            <li className="options__item" onClick={onAddToWishlist}>
              Add To Wishlist
            </li>
          )}

          {!cartState.cart?.cartProducts.find((i) => i.productId === id) && (
            <li className="options__item" onClick={onAddToCart}>
              Add To Cart
            </li>
          )}

          <li className="options__item" onClick={() => setShowShareModal(true)}>
            Share Product
          </li>
        </ul>
      </div>
    </>
  );
};

export default ActionsBox;
