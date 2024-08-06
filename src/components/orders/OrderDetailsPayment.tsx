import { memo } from "react";

const OrderDetailsPayment = ({
  orderNumber,
  paymentMethod,
  total,
  shippingFee,
}: OrderDetailsPaymentProps) => {
  return (
    <div className="total-payment">
      <div className="total-payment__header">
        <div className="total-payment__item">
          <h5>Order Id</h5>
          <p>(#{orderNumber})</p>
        </div>
        <div className="total-payment__item">
          <h5>Payment via</h5>
          <p>({paymentMethod})</p>
        </div>
      </div>
      <div className="total-payment__content">
        <div className="total-payment__content--item">
          <h5>Subtotal</h5>
          <p>${(total - shippingFee).toFixed(2)}</p>
        </div>
        <div className="total-payment__content--item">
          <h5>Discount</h5>
          <p>$0.00</p>
        </div>
        <div className="total-payment__content--item">
          <h5>Shipping</h5>
          <p>{shippingFee ? "$" + shippingFee.toFixed(2) : "Free"}</p>
        </div>
        <div className="total-payment__content--item">
          <h5>Total</h5>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

interface OrderDetailsPaymentProps {
  orderNumber: number;
  paymentMethod: string;
  total: number;
  shippingFee: number;
}

export default memo(OrderDetailsPayment);
