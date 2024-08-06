import { Link } from "react-router-dom";
import DashboardNav from "../../components/dashboard/DashboardNav";
import FilterOptions from "../../components/UI/FilterOptions";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { UserActionKind, UserContext } from "../../store/UserContext";
import { getCustomers } from "../../api/customers";
import ReloadIcon from "../../components/UI/Icons/ReloadIcon";
import CustomersSkeleton from "../../skeletons/TableItemsSkeleton";
import TableHeader from "../../components/TableHeader";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { AuthContext } from "../../store/AuthContext";

export const sortOptions = [
  { name: "Sort by: Active", _id: "active" },
  { name: "Sort by: Inactive", _id: "inactive" },
  { name: "Sort by: Pending", _id: "pending" },
  { name: "Clear sorting", _id: "" },
];
const customerItemsWidths = ["100%", "100%", "100%", "100%", "100%"];
const customersTableHeaderItems = ["NAME", "EMAIL", "TELEPHONE", "STATUS", ""];

const Customers = () => {
  const [reload, setReload] = useState<boolean>(false);
  const {
    state: {
      customers,
      customersLoading,
      customersError,
      sortQuery,
      sortedCustomers,
    },
    sortCustomers,
    dispatch,
  } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (customers && !reload) return;
    dispatch({ type: UserActionKind.GET_CUSTOMERS_START });
  }, [auth.accessToken, customers, dispatch, reload]);

  useEffect(() => {
    // We do no fetch customers if there is already data until the 'reload' button is clicked.
    if ((customers && !reload) || !auth.accessToken) return;
    (async () => {
      await getCustomers(dispatch, axiosPrivate);
      setReload(false);
    })();
  }, [customers, dispatch, reload, axiosPrivate, auth.accessToken]);

  // If there is sort query, we show sorted customers.
  const customersArr = sortQuery ? sortedCustomers : customers;

  return (
    <div className="section-sm">
      <div className="container">
        <div className="dashboard">
          <DashboardNav activeNavItem="Customers" />

          <div className="customers">
            <div className="filter__top">
              <FilterOptions
                options={sortOptions}
                title="Sort By: Status"
                onSelect={(arg: string) => sortCustomers(arg)}
                query={sortQuery}
                clearOption
              />
            </div>

            <div className="order-history">
              <div className="order-history__header">
                <h2>Customer List ({customers?.length || 0})</h2>
                <button
                  className="reload"
                  disabled={reload && true}
                  onClick={() => setReload(true)}
                  children={<ReloadIcon />}
                />
              </div>

              <div className="order-history__table">
                <table className="table">
                  <TableHeader items={customersTableHeaderItems} />
                  <tbody>
                    {customersLoading && (
                      <CustomersSkeleton widths={customerItemsWidths} />
                    )}

                    {customersArr?.map((customer) => (
                      <tr className="table__item" key={customer._id}>
                        <td>
                          <p>{customer.name}</p>
                        </td>
                        <td>
                          <p>{customer.email}</p>
                        </td>
                        <td>
                          <p>{customer.phoneNumber || "not added"}</p>
                        </td>
                        <td>
                          <p>{customer.status}</p>
                        </td>
                        <td>
                          <Link
                            to={`/customers/${customer._id}`}
                            className="view-details"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}

                    {customers?.length === 0 && (
                      <tr className="order-history__empty">
                        <td>No Customers found</td>
                      </tr>
                    )}

                    {customersError && !customersLoading && (
                      <tr className="table__empty">
                        <td>{customersError}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
