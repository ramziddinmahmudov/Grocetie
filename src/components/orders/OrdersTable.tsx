import { Link } from "react-router-dom";
import { OrderProps } from "../../utils/user-types";
import OrderItem from "./OrderItem";
import TableItemSkeleton from "../../skeletons/TableItemsSkeleton";
import TableHeader from "../TableHeader";

const ordersTableHeaderItems = ["ORDER ID", "DATE", "TOTAL", "STATUS", ""];
const orderItemsWidths = ["60%", "90%", "90%", "90%", "90%"];

const OrdersTable = ({
  orders,
  recent,
  filterQuery,
  loading,
  error,
}: OrdersTableProps) => {
  return (
    <div className="order-history">
      <div className="order-history__header">
        <h2>{recent && "Recent "}Order History</h2>
        {recent && <Link to="/orders">View All</Link>}
      </div>

      <div className="order-history__table">
        <table className="table">
          <TableHeader items={ordersTableHeaderItems} />

          <tbody>
            {loading && !orders && (
              <TableItemSkeleton widths={orderItemsWidths} />
            )}

            {orders?.map((order: OrderProps) => (
              <OrderItem
                key={order._id}
                orderNumber={order.orderNumber}
                numOfProducts={order.orderedProducts.length}
                totalPrice={order.totalPrice}
                status={order.status}
                id={order._id}
                createdAt={order.createdAt}
              />
            ))}

            {orders?.length === 0 && (
              <tr className="table__empty">
                <td>
                  {filterQuery
                    ? "No orders with that filter."
                    : `No${recent ? " recent" : ""} orders yet.`}
                </td>
              </tr>
            )}

            {error && !loading && (
              <tr className="table__empty">
                <td>{error}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface OrdersTableProps {
  orders: OrderProps[] | null;
  recent?: boolean;
  filterQuery?: string;
  error: string | null;
  loading: boolean;
}

export default OrdersTable;
