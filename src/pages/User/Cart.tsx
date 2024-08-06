import { Link } from "react-router-dom";
import BillCard from "../../components/cart/BillCard";
import CartItem from "../../components/cart/CartItem";
import CartHeader from "../../components/cart/CartHeader";
import SectionHead from "../../components/UI/SectionHeader";
import LoginFirst from "../../components/LoginFirst";
import { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { CartProductProps } from "../../utils/user-types";
import { UserContext } from "../../store/UserContext";

const Cart = () => {
  const { state } = useContext(UserContext);
  const {
    state: { cart, cartLoading, error },
  } = useContext(CartContext);

  if (state.user === null) return <LoginFirst />;
  if (cartLoading) return <LoadingSpinner />;

  return (
    <div className="section-md">
      <div className="container">
        <SectionHead text="My Shopping Cart" />

        <div className="cart__content-container">
          <div className="cart__content">
            <div className="cart__content--table">
              {cart && (
                <table>
                  <CartHeader />
                  <tbody>
                    {cart?.cartProducts?.length > 0 &&
                      cart.cartProducts.map((item: CartProductProps) => (
                        <CartItem cartItem={item} key={item._id} />
                      ))}
                  </tbody>
                </table>
              )}
            </div>

            {!cart && !error && (
              <div className="cart__content--empty">
                <h2>No products yet</h2>
              </div>
            )}

            {error && (
              <div className="cart__content--error">
                <h2>{error}</h2>
              </div>
            )}

            <div className="cart__action">
              <Link to="/shop" className="button button-md return-to-shop">
                Return To Shop
              </Link>
            </div>
          </div>

          {!cartLoading && <BillCard cart={cart} type="cart" />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
