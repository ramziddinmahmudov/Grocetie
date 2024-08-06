import ActionsBox from "./ActionsBox";
import { Link } from "react-router-dom";
import RatingsStars from "../UI/RatingsStars";
import { ProductItemTypes } from "../../utils/user-types";

const CompareItem = ({ product }: { product: ProductItemTypes }) => {
  let discountPercent: number = 0;
  if (product.discountedPrice > 0) {
    const priceGap = product.price - product.discountedPrice;
    discountPercent = priceGap / (product.price / 100);
  }

  return (
    <div className="compare-item">
      <div className="compare-item__img-box">
        {!product.inStock && <span className="stock-out">Out of Stock</span>}

        <Link to={`/products/${product._id}`} draggable="false">
          <img
            draggable="false"
            className="compare-item__img"
            src={product.images[0].imageUrl}
            alt=""
          />
        </Link>
        <ActionsBox id={product._id} />
      </div>
      <div className="compare-item__main">
        <h2 className="compare-item__title">
          <span>{product.brandName ? "[" + product.brandName + "]" : ""}</span>
          {product.name}
          <span>
            {product.features ? product.features : ""}{" "}
            {product.weight ? product.weight : ""}{" "}
          </span>
        </h2>
        <div className="compare-item__ratings">
          <RatingsStars
            ratingsAverage={product.ratingsAverage}
            ratingsQuantity={product.ratingsQuantity}
          />
        </div>
        <div className="compare-item__price">
          {product.discountedPrice > 0 && (
            <>
              <del className="discounted-price">
                ${product.price.toFixed(2)}
              </del>
              <h2>${product.discountedPrice.toFixed(2)}</h2>
              <span className="sale-off">
                {Math.round(discountPercent)}% Off
              </span>
            </>
          )}

          {!product.discountedPrice && <h2>${product.price.toFixed(2)}</h2>}
        </div>
        <p className="compare-item__description">{product.description}</p>
      </div>
    </div>
  );
};

export default CompareItem;
