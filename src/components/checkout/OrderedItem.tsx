import { Link } from "react-router-dom";
import { CartProductProps } from "../../utils/user-types";

const OrderedItem = ({ cartItem }: { cartItem: CartProductProps }) => {
  return (
    <div className="ordered__item">
      <div className="ordered__item--details">
        <Link to={`/products/${cartItem.productId}`}>
          <img className="ordered__item--img" src={cartItem.image} alt="" />
        </Link>
        <div>
          <h5>{cartItem.name}</h5>
          <span>{cartItem.quantity}x</span>
        </div>
      </div>
      <h6 className="ordered__item--price">${cartItem.subTotal.toFixed(2)}</h6>
    </div>
  );
};

export default OrderedItem;
