import ReactDOM from "react-dom";
import CloseIcon from "../UI/Icons/CloseIcon";
import CartModalItem from "../cart/CartModalItem";
import { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import { CartProductProps } from "../../utils/user-types";
import { useNavigate } from "react-router-dom";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const CartOverLay = (props: { closeModal: () => void }) => {
  const navigate = useNavigate();
  const {
    state: { cart, error },
  } = useContext(CartContext);

  const onNavigate = (link: string): void => {
    props.closeModal();
    navigate(link);
  };

  return (
    <div className="cart-modal">
      <div className="cart-modal__header">
        <h5>
          Shopping Cart <span>({cart?.cartProducts.length || 0})</span>
        </h5>
        <div className="cart-modal__close" onClick={props.closeModal}>
          <CloseIcon />
        </div>
      </div>
      <div className="cart-modal__items">
        {cart &&
          cart.cartProducts.map((item: CartProductProps) => (
            <CartModalItem
              key={item._id}
              cartItem={item}
              closeModal={props.closeModal}
            />
          ))}

        {!cart && !error && (
          <div className="cart-modal__empty">
            <h2>Cart Is Empty</h2>
          </div>
        )}

        {error && (
          <div className="cart-modal__error">
            <h2>{error}</h2>
          </div>
        )}
      </div>

      <div className="cart-modal__bottom">
        <div className="cart-modal__bottom--info">
          <p>
            {cart?.cartProducts.length || 0} Product
            {cart && cart.cartProducts.length > 1 ? "s" : ""}
          </p>
          <span>${cart ? cart.totalPrice.toFixed(2) : "0.00"}</span>
        </div>
        <form className="cart-modal__form">
          <button
            className="button button-lg cart__checkout"
            onClick={onNavigate.bind(null, "/checkout")}
            disabled={!cart && true}
            children="Checkout"
          />
          <button
            className="button button-lg go-to-cart"
            onClick={onNavigate.bind(null, "/my-cart")}
            children="Go to cart"
          />
        </form>
      </div>
    </div>
  );
};

const CartModal = (props: { closeModal: () => void }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <CartOverLay closeModal={props.closeModal} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default CartModal;
