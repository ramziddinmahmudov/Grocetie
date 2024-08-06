import { useNavigate } from "react-router-dom";
import { CartProductProps, CartProps } from "../../utils/user-types";
import OrderedItem from "../checkout/OrderedItem";
import LoadingButtonSpinner from "../UI/Icons/LoadingButtonSpinner";

const BillCard = ({ cart, type, placeOrder, loading }: BillCardProps) => {
  const navigate = useNavigate();
  const shippingFee: number = cart ? (cart.totalPrice < 50 ? 5.0 : 0) : 0;
  const total: number = cart ? cart?.totalPrice + shippingFee : 0;

  return (
    <div className="bill-card">
      <div className="bill-card__top">
        <h2>Order Summary</h2>
        {type === "checkout" && (
          <div className="ordered">
            {cart?.cartProducts.length! > 0 &&
              cart?.cartProducts.map((item: CartProductProps) => (
                <OrderedItem key={item._id} cartItem={item} />
              ))}
          </div>
        )}

        <div className="bill-card__detail">
          <p>Subtotal:</p>
          <span>${cart?.totalPrice.toFixed(2) || "0.00"}</span>
        </div>
        <div className="bill-card__detail">
          <p>Shipping:</p>
          <span>
            {cart
              ? shippingFee
                ? "$" + shippingFee.toFixed(2)
                : "Free"
              : "$0.00"}
          </span>
        </div>
        <div className="bill-card__detail">
          <p>Total quantity:</p>
          <span>{cart ? "x" + cart.totalQuantity : 0}</span>
        </div>
        <div className="bill-card__detail">
          <p>Total</p>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {type === "checkout" && (
        <>
          {/* <div className="payment__method">
            <h2>Payment Method</h2>
            <div className="payment__method--box">
              {["Paypal", "Stripe"].map((val: string) => (
                <div
                  className="payment__method--item radio-input"
                  key={val}
                  onClick={() => setPaymentMethod(val)}
                >
                  <input type="radio" id={val} name="payment" />
                  <label htmlFor={val}>
                    <span></span> {val}
                  </label>
                </div>
              ))}
            </div>
          </div> */}
          <button
            className="button button-lg bill-card__action"
            onClick={placeOrder}
            disabled={loading && true}
            children={loading ? <LoadingButtonSpinner /> : "Place order"}
          />
        </>
      )}
      {type === "cart" && (
        <button
          className="button button-lg bill-card__action"
          onClick={() => navigate("/checkout")}
          disabled={!cart && true}
          children="Go to checkout"
        />
      )}
    </div>
  );
};

interface BillCardProps {
  cart: CartProps | null;
  type: "checkout" | "cart";
  placeOrder?: () => Promise<void>;
  loading?: boolean;
}

export default BillCard;
