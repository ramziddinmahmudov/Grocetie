import { useContext, useState } from "react";
import Counter from "../UI/Counter";
import WarningModal from "../modals/WarningModal";
import { CartProductProps } from "../../utils/user-types";
import { Link } from "react-router-dom";
import { deleteProductCart } from "../../api/cart";
import { CartContext } from "../../store/CartContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const CartItem = ({ cartItem }: { cartItem: CartProductProps }) => {
  const [warningModal, setWarningModal] = useState(() => false);

  const { dispatch } = useContext(CartContext);
  const axiosPrivate = useAxiosPrivate();

  const onDeleteProduct = async (setLoading: (arg: boolean) => void) => {
    await deleteProductCart(
      dispatch,
      cartItem.productId,
      axiosPrivate,
      setLoading
    );
  };

  return (
    <>
      {warningModal && (
        <WarningModal
          text="Are your sure that you want to remove this product from your cart?"
          closeModal={() => setWarningModal(false)}
          actionHandler={onDeleteProduct}
        />
      )}

      <tr className="cart__item">
        <td className="cart__item--product">
          <Link to={`/products/${cartItem.productId}`}>
            <img src={cartItem.image} alt="" />
          </Link>
          <h5>{cartItem.name}</h5>
        </td>

        <td className="cart__item--price">
          <p>${cartItem.price.toFixed(2)}</p>
        </td>

        <td className="cart__item--counter">
          <Counter
            defaultValue={cartItem.quantity}
            forCart
            id={cartItem.productId}
          />
        </td>
        <td className="cart__item--subtotal">
          <p>${cartItem.subTotal.toFixed(2)}</p>
        </td>
        <td className="cart__item--delete">
          <div onClick={() => setWarningModal(true)}>
            <img src="/assets/icons/delete-icon.svg" alt="" />
          </div>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
