import Counter from "../UI/Counter";
import RatingsStars from "../UI/RatingsStars";

const ProductCardDetails = ({
  id,
  name,
  ratingsAverage,
  discountedPrice,
  price,
  inStock,
}: ProductCardDetailsProps) => {
  return (
    <>
      <div className="product-item__details">
        <div className="product-item__info">
          <h6 className="name">{name}</h6>
          <div className="product-item__ratings">
            <RatingsStars
              ratingsAverage={ratingsAverage}
              notRatingsQuantity={true}
            />
          </div>
          <div className="price">
            {discountedPrice > 0 ? (
              <>
                <span className="discounted-price">
                  ${discountedPrice.toFixed(2)}
                </span>
                <del className="actual-price">${price.toFixed(2)}</del>
              </>
            ) : (
              <span className="discounted-price">${price.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className="product-item__actions">
          <Counter isSmall id={id} inStock={inStock} />
        </div>
      </div>
    </>
  );
};

interface ProductCardDetailsProps {
  name: string;
  discountedPrice: number;
  price: number;
  inStock: boolean;
  ratingsAverage: number;
  id: string;
}

export default ProductCardDetails;
