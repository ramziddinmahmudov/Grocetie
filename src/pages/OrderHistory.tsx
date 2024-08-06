import OrdersTable from "../components/orders/OrdersTable";
import DashboardNav from "../components/dashboard/DashboardNav";
import FilterOptions from "../components/UI/FilterOptions";
import { useContext, useEffect, useLayoutEffect } from "react";
import LoginFirst from "../components/LoginFirst";
import { UserContext } from "../store/UserContext";
import { OrderActionKind, OrderContext } from "../store/OrderContext";
import { getAllOrders, getMyOrders } from "../api/orders";
import { orderPriceOptions, orderSortOptions } from "../data/helperData";
import useAxiosPrivate from "../hooks/auth/useAxiosPrivate";
import { AuthContext } from "../store/AuthContext";

const OrderHistory = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    state: { orders, loading, customOrders, filterQuery, sortQuery, error },
    dispatch,
    filterOrders,
    sortOrders,
  } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useLayoutEffect(() => {
    dispatch({ type: OrderActionKind.GET_ORDERS_START });
  }, [auth.accessToken, dispatch]);

  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => {
      // For user
      if (user?.role === "user")
        await getMyOrders(dispatch, axiosPrivate, "sort=-createdAt");
      // For admin
      else await getAllOrders(dispatch, axiosPrivate, "sort=-createdAt");
    })();
  }, [dispatch, user, axiosPrivate, auth.accessToken]);

  if (user === null) return <LoginFirst />;

  return (
    <div className="section-sm">
      <div className="container">
        <div className="order-history-page dashboard">
          <DashboardNav activeNavItem="Order History" />

          <div className="dashboard__main">
            <div className="filter__top">
              <FilterOptions
                options={orderPriceOptions}
                title="Select Price"
                onSelect={(id: string) => filterOrders(id)}
                query={filterQuery}
                clearOption
              />
              <FilterOptions
                options={orderSortOptions}
                title="Sort By: Status"
                onSelect={(id: string) => sortOrders(id)}
                query={sortQuery}
                clearOption
              />
            </div>

            <OrdersTable
              orders={filterQuery || sortQuery ? customOrders : orders}
              filterQuery={filterQuery}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
