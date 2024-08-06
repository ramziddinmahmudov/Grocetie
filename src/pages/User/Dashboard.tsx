import OrdersTable from "../../components/orders/OrdersTable";
import UserDetails from "../../components/dashboard/UserDetails";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrdersByStatus from "../../components/admin/OrdersByStatus";
import { useContext, useEffect, useLayoutEffect } from "react";
import LoginFirst from "../../components/LoginFirst";
import { UserContext } from "../../store/UserContext";
import { OrderActionKind, OrderContext } from "../../store/OrderContext";
import {
  getMyOrders,
  getOrdersStats,
  getRecentOrdersForAdmin,
} from "../../api/orders";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { AuthContext } from "../../store/AuthContext";

const Dashboard = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  const { state: ordersState, dispatch } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useLayoutEffect(() => {
    dispatch({ type: OrderActionKind.GET_RECENT_ORDERS_START });
  }, [auth.accessToken, dispatch, user]);

  useEffect(() => {
    if (!auth.accessToken) return;

    (async () => {
      if (user?.role !== "user")
        await Promise.all([
          getRecentOrdersForAdmin(dispatch, axiosPrivate),
          getOrdersStats(dispatch, axiosPrivate),
        ]);
      else getMyOrders(dispatch, axiosPrivate, "limit=10&sort=-createdAt");
    })();
  }, [dispatch, user, axiosPrivate, auth.accessToken]);

  if (user === null) return <LoginFirst />;

  return (
    <div className="section-sm ">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Dashboard" />
          <div className="dashboard__main">
            <UserDetails user={user} />
            {user && ["admin", "manager"].includes(user.role) && (
              <OrdersByStatus stats={ordersState.stats} />
            )}

            <OrdersTable
              orders={ordersState.recentOrders}
              recent
              loading={ordersState.recentLoading}
              error={ordersState.error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
