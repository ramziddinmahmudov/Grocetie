import OrderStatusBar from "./OrderStatusBar";
import OrderDetailsPayment from "./OrderDetailsPayment";
import FilterOptions from "../UI/FilterOptions";
import { useContext, useState } from "react";
import { UserContext } from "../../store/UserContext";
import { OrderProps } from "../../utils/user-types";
import { updateOrder } from "../../api/orders";
import { OrderContext } from "../../store/OrderContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import OrderDetailsAddress from "./OrderDetailsAddress";

const statusOptions = [
  {
    name: "On The Way",
    _id: "on the way",
  },
  {
    name: "Delivered",
    _id: "delivered",
  },
];

const OrderDetailsContent = ({ order }: { order: OrderProps }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useContext(UserContext);
  const { dispatch } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();

  const onUpdateOrder = async (arg: string) => {
    if (loading || order.status === arg) return;
    const actionType = arg === "on the way" ? "on-the-way" : "delivered";
    setLoading(true);
    await updateOrder(dispatch, axiosPrivate, order._id, actionType);
    setLoading(false);
  };

  return (
    <div className="order-details__content">
      <div className="order-details__content--main">
        <OrderDetailsPayment
          orderNumber={order.orderNumber}
          paymentMethod={order.paymentMethod}
          total={order.totalPrice}
          shippingFee={order.deliveryFee}
        />
        <OrderDetailsAddress
          address={order.address}
          createdAt={order.createdAt}
          deliveredAt={order.deliveredAt}
        />
      </div>

      {order.notes && (
        <div className="order-details__notes">
          <h1>Special note:</h1>
          <p>{order.notes}</p>
        </div>
      )}

      {order.status === "cancelled" && (
        <div className="order-details__cancelled">
          <h1>Order has been cancelled.</h1>
        </div>
      )}

      {order.status !== "cancelled" && (
        <>
          <OrderStatusBar status={order.status} />

          {state.user && state.user.role !== "user" && (
            <div className="update-order">
              <div className="order-status">
                <h2>Order Status: </h2>
                <span>{order.status}</span>
              </div>
              <div className="update-order__item">
                <h2>Update Order: </h2>
                <FilterOptions
                  options={statusOptions}
                  title=""
                  onSelect={(arg: string) => onUpdateOrder(arg)}
                  defaultValue={order.status}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetailsContent;
