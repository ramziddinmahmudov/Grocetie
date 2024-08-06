import UserIcon from "../../components/UI/Icons/UserIcon";
import DashboardNav from "../../components/dashboard/DashboardNav";
import OrderStatistics from "../../components/admin/OrderStatistics";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../store/OrderContext";
import { UserContext } from "../../store/UserContext";
import { getOrdersRevenueStats } from "../../api/orders";
import { getCustomersStats } from "../../api/customers";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { AuthContext } from "../../store/AuthContext";

const Statistics = () => {
  const { state, dispatch } = useContext(OrderContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  /// Current month
  const month = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(new Date(Date.now()));

  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => {
      await Promise.all([
        getOrdersRevenueStats(dispatch, axiosPrivate),
        getCustomersStats(userDispatch, axiosPrivate),
      ]);
    })();
  }, [dispatch, userDispatch, axiosPrivate, auth.accessToken]);

  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Statistics" />
          <div className="statistics">
            <OrderStatistics stats={state.revenue} />
            <div className="order-numbers">
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <UserIcon />
                </div>
                <div className="order-numbers__main">
                  <h6>Total Customers</h6>
                  <span>{userState.customersStats.total}</span>
                </div>
              </div>
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <UserIcon />
                </div>
                <div className="order-numbers__main">
                  <h6>New Customers</h6>
                  <span>{userState.customersStats.new}</span>
                </div>
              </div>
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <UserIcon />
                </div>
                <div className="order-numbers__main">
                  <h6>{month} Customers</h6>
                  <span>{userState.customersStats.thisMonth}</span>
                </div>
              </div>
            </div>
            <div className="order-numbers">
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <img src="/assets/icons/money-white-icon.svg" alt="" />
                </div>
                <div className="order-numbers__main">
                  <h6>Total Revenue</h6>
                  <span>${state.revenue.totalRevenue.toFixed(2)}</span>
                </div>
              </div>
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <img src="/assets/icons/shopping-cart.svg" alt="" />
                </div>
                <div className="order-numbers__main">
                  <h6>Total Orders</h6>
                  <span>{state.revenue.total}</span>
                </div>
              </div>
              <div className="order-numbers__item">
                <div className="order-numbers__img">
                  <img src="/assets/icons/cancel.svg" alt="" />
                </div>
                <div className="order-numbers__main">
                  <h6>Cancelled Orders</h6>
                  <span>{state.revenue.cancelled}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
