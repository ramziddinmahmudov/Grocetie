import { useContext, useState } from "react";
import { CartProductProps } from "../../utils/user-types";
import { CartContext } from "../../store/CartContext";
import { deleteProductCart } from "../../api/cart";
import LoadingCounterSpinner from "../UI/Icons/LoadingCounterSpinner";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const CartItem = ({
  cartItem,
  closeModal,
}: {
  cartItem: CartProductProps;
  closeModal: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(CartContext);
  const axiosPrivate = useAxiosPrivate();

  const onGoToProduct = () => {
    navigate(`/products/${cartItem.productId}`);
    closeModal();
  };

  const onDeleteProductFromCart = async () => {
    await deleteProductCart(
      dispatch,
      cartItem.productId,
      axiosPrivate,
      setLoading
    );
  };

  return (
    <>
      <div className="cart-modal__item">
        <div className="cart-modal__item--main">
          <img src={cartItem.image} alt="" onClick={onGoToProduct} />
          <div className="cart-modal__item--info">
            <span className="cart-modal__item--name">{cartItem.name}</span>
            <p>
              {cartItem.quantity} x ${cartItem.price.toFixed(2)}
            </p>
            <h5>Total: ${cartItem.subTotal.toFixed(2)}</h5>
          </div>
        </div>
        <button
          className="delete-item"
          onClick={onDeleteProductFromCart}
          disabled={loading && true}
        >
          {loading ? (
            <LoadingCounterSpinner />
          ) : (
            <img src="/assets/icons/delete-icon.svg" alt="" />
          )}
        </button>
      </div>
    </>
  );
};

export default CartItem;
