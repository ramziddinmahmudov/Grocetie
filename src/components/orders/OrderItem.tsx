import { Link } from "react-router-dom";

const OrderItem = ({
  orderNumber,
  numOfProducts,
  totalPrice,
  status,
  id,
  createdAt,
}: OrderItemProps) => {
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(createdAt)
  );
  const date = new Date(createdAt).getDate();
  const year = new Date(createdAt).getFullYear();

  return (
    <tr className="table__item" key={id}>
      <td>#{orderNumber}</td>
      <td>{date + " " + month + ", " + year}</td>
      <td>
        <span>${totalPrice.toFixed(2)} </span>({numOfProducts} Products)
      </td>
      <td>{status}</td>
      <td>
        <Link to={`/orders/${id}`} className="view-details">
          View Details
        </Link>
      </td>
    </tr>
  );
};

interface OrderItemProps {
  orderNumber: number;
  numOfProducts: number;
  totalPrice: number;
  status: string;
  id: string;
  createdAt: Date;
}

export default OrderItem;
