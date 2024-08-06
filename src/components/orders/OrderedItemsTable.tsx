import { memo } from "react";
import { CartProductProps } from "../../utils/user-types";

const OrderedItemsTable = ({ items }: { items: CartProductProps[] }) => {
  return (
    <div className="order-details__table">
      <table>
        <thead>
          <tr className="table__header">
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr className="table__item" key={item._id}>
              <td className="table__item--img">
                <img src={item.image} alt="" />
                <h5>{item.name}</h5>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>x{item.quantity}</td>
              <td>${item.subTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(OrderedItemsTable);
