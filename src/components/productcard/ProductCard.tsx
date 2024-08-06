import { ProductItemTypes } from "../../utils/user-types";
import ProductCardDetails from "./ProductCardMain";
import ProductCardImg from "./ProductCardImg";

const ProductCard = ({ item }: { item: ProductItemTypes }) => {
  return (
    <div className="product-item">
      <ProductCardImg item={item} />
      <ProductCardDetails
        name={item.name}
        price={item.price}
        discountedPrice={item.discountedPrice}
        inStock={item.inStock}
        ratingsAverage={item.ratingsAverage}
        id={item._id}
      />
    </div>
  );
};

export default ProductCard;
