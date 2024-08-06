import { useContext, useEffect, useLayoutEffect, useState } from "react";
// import WarningModal from "../../components/modals/WarningModal";
import OrdersTable from "../../components/orders/OrdersTable";
import DashboardNav from "../../components/dashboard/DashboardNav";
import { UserActionKind, UserContext } from "../../store/UserContext";
import { getCustomer } from "../../api/customers";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { getUserOrders } from "../../api/orders";
import { OrderActionKind, OrderContext } from "../../store/OrderContext";
import UserDetailsMain from "../../components/dashboard/UserDetailsMain";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { AuthContext } from "../../store/AuthContext";
import WarningModal from "../../components/modals/WarningModal";
import { makeMeManager } from "../../api/user";

const CustomerDetails = () => {
  const [warningModal, setWarningModal] = useState(() => false);
  const { customerId } = useParams();
  const {
    state: { customer, user, customerLoading, customerError },
    dispatch,
  } = useContext(UserContext);
  const {
    state: { userOrders, loading, error },
    dispatch: orderDisatch,
  } = useContext(OrderContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useLayoutEffect(() => {
    dispatch({ type: UserActionKind.GET_CUSTOMER_START });
    orderDisatch({ type: OrderActionKind.GET_USER_ORDERS_START });
  }, [dispatch, orderDisatch]);

  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => {
      await Promise.all([
        getCustomer(dispatch, customerId!, axiosPrivate),
        getUserOrders(orderDisatch, axiosPrivate, customerId!),
      ]);
    })();
  }, [customerId, dispatch, orderDisatch, axiosPrivate, auth.accessToken]);

  const onMakeMeManager = async (setLoading: (arg: boolean) => void) => {
    setLoading(true);
    const role = customer?.role === "user" ? "manager" : "user";
    await makeMeManager(dispatch, axiosPrivate, customerId!, role);
    setLoading(false);
    setWarningModal(false);
  };

  return (
    <>
      {warningModal && (
        <WarningModal
          text="Are you sure that you want to make this user a manager?"
          closeModal={() => setWarningModal(false)}
          actionHandler={onMakeMeManager}
        />
      )}

      <div className="section-sm">
        <div className="container">
          <div className="dashboard">
            <DashboardNav activeNavItem="Customers" />

            {customerLoading && <LoadingSpinner />}

            {customer && (
              <div className="customer-details dashboard__main">
                <div className="user__details">
                  <UserDetailsMain
                    photo={customer.photo}
                    name={customer.name}
                    username={customer.username}
                    phoneNumber={customer.phoneNumber}
                    email={customer.email}
                  />

                  <div className="address-book">
                    <div className="address-book__header">
                      Shipping Addresses
                    </div>
                    <div className="address-book__items">
                      {customer.addresses?.length > 0 &&
                        customer.addresses?.map((item) => (
                          <div className="address-book__item" key={item._id}>
                            <h5>{item.name}</h5>
                            <p>{`${item.address1}, ${
                              item.address2 ? item.address2 : ""
                            }, ${item.city}, ${item.postalCode}, `}</p>
                            <span>{item.phoneNumber}</span>
                          </div>
                        ))}
                      {customer?.addresses.length === 0 && (
                        <p className="no-addresses">No addresses yet</p>
                      )}
                    </div>
                  </div>
                </div>

                {user?._id !== customer?._id && user?.role === "admin" && (
                  <div className="customer-details__actions">
                    <button
                      className="button add-button"
                      onClick={() => setWarningModal(true)}
                      children={`Make me ${
                        customer.role === "user" ? "manager" : "user"
                      }`}
                    />
                  </div>
                )}

                <OrdersTable
                  orders={userOrders}
                  loading={loading}
                  error={error}
                />
              </div>
            )}

            {customerError && !customerLoading && (
              <div className="order-details__error">
                <h1>{customerError}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
