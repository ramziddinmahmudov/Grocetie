import debounce from "debounce";
import { useContext, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CartContext } from "../../store/CartContext";
import { addToCart, deleteProductCart, updateCart } from "../../api/cart";
import LoadingButtonSpinner from "./Icons/LoadingButtonSpinner";
import React from "react";
import LoadingCounterSpinner from "./Icons/LoadingCounterSpinner";
import WarningModal from "../modals/WarningModal";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const Counter = ({
  defaultValue,
  forCart,
  isSmall,
  id,
  inStock,
  cartIcon,
}: CounterProps) => {
  const [warningModal, setWarningModal] = useState(() => false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [counterLoading, setCounterLoading] = useState<boolean>(false);
  const counterRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const { state, dispatch } = useContext(CartContext);
  const axiosPrivate = useAxiosPrivate();

  const changeInputvalue = (num: number): void => {
    const currentValue = Number(counterRef.current?.value);
    // When the user wants to completely remove the product from the cart
    if (currentValue === 1 && num < 0) {
      setWarningModal(true);
      return;
    }
    counterRef.current!.value = String(currentValue + num);
  };

  // This function is executed after 300 milliseconds after click and terminated if another click comes before 300 milliseconds. This prevents the user to send many requests to the backend.
  const onUpdateCart = async () => {
    const quantity = Number(counterRef.current?.value);

    if (forCart && !warningModal)
      await updateCart(dispatch, id, quantity, setCounterLoading, axiosPrivate);
  };

  // This function is called when the user wants to add one or multiple quantities of one product to the cart. This is used in ProductCard, QuickViewModal and ProductDetails.
  const onAddToCart = async () => {
    const quantity = Number(counterRef.current?.value);
    await addToCart(dispatch, id, quantity, axiosPrivate, setBtnLoading);
  };

  const onDeleteProduct = async (setLoading: (arg: boolean) => void) => {
    await deleteProductCart(dispatch, id, axiosPrivate, setLoading);
    setWarningModal(false);
  };

  return (
    <>
      {warningModal && forCart && (
        <WarningModal
          text="Are you sure that you want to remove this product from your cart?"
          closeModal={() => setWarningModal(false)}
          actionHandler={onDeleteProduct}
        />
      )}
      <div className={`counter${isMobile || isSmall ? " counter-s" : ""}`}>
        <button
          className="decrement"
          disabled={forCart && state.updateLoading && true}
          onMouseUp={changeInputvalue.bind(null, -1)}
          onClick={debounce(onUpdateCart, 300)}
          children={counterLoading ? <LoadingCounterSpinner /> : "-"}
        />
        <input
          className="input"
          ref={counterRef}
          type="text"
          defaultValue={defaultValue || 1}
          readOnly
        />
        <button
          className="increment"
          disabled={forCart && state.updateLoading && true}
          onMouseUp={changeInputvalue.bind(null, 1)}
          onClick={debounce(onUpdateCart, 300)}
          children={counterLoading ? <LoadingCounterSpinner /> : "+"}
        />
      </div>

      {!forCart && (
        <button
          className="button add-to-cart"
          disabled={(!inStock || state.updateLoading) && true}
          onClick={onAddToCart}
        >
          {btnLoading ? <LoadingButtonSpinner /> : "Add To Cart"}
          {cartIcon && !btnLoading && (
            <span>
              <svg>
                <use href="/assets/icons/icons.svg#icon-shopping-cart"></use>
              </svg>
            </span>
          )}
        </button>
      )}
    </>
  );
};

interface CounterProps {
  defaultValue?: number;
  forCart?: boolean;
  isSmall?: boolean;
  id: string;
  inStock?: boolean;
  cartIcon?: boolean;
}

export default React.memo(Counter);
