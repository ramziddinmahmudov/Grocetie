import { Link, useParams } from "react-router-dom";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrderedItemsTable from "../../components/orders/OrderedItemsTable";
import OrderDetailsContent from "../../components/orders/OrderDetailsContent";
import { useContext, useEffect, useLayoutEffect } from "react";
import { getOneOrder } from "../../api/orders";
import { OrderActionKind, OrderContext } from "../../store/OrderContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { AuthContext } from "../../store/AuthContext";

const OrderDetails = () => {
  const { orderId } = useParams();
  const {
    state: { orderLoading, error, order },
    dispatch,
  } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useLayoutEffect(() => {
    dispatch({ type: OrderActionKind.GET_ORDER_START });
  }, [dispatch]);

  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => await getOneOrder(dispatch, axiosPrivate, orderId!))();
  }, [dispatch, orderId, axiosPrivate, auth.accessToken]);

  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Order History" />

          {orderLoading && <LoadingSpinner />}

          {order && (
            <div className="order-details">
              <div className="order-details__info">
                <div className="order-details__header">
                  <h2>Order Details</h2>
                  <Link to="/orders">Back</Link>
                </div>
                <OrderDetailsContent order={order} />
                <OrderedItemsTable items={order.orderedProducts} />
              </div>
            </div>
          )}

          {error && !orderLoading && (
            <div className="order-details__error">
              <h1>{error}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
