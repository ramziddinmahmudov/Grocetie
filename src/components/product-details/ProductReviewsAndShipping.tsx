import { useState } from "react";
import ReviewsList from "../reviews/ReviewsList";
import ShippingPolicy from "./ShippingPolicy";

const ProductReviewsAndShipping = () => {
  const [contend, setContend] = useState<string>("Reviews");
  return (
    <div>
      <div className="reviews__header">
        <div className="container">
          <h4
            className={`${contend === "Reviews" && "active-content"}`}
            onClick={() => setContend("Reviews")}
            children="Customer feedbacks"
          />
          <h4
            className={`${contend === "Shipping" && "active-content"}`}
            onClick={() => setContend("Shipping")}
            children="Shipping Policy"
          />
        </div>
      </div>
      <ReviewsList show={contend === "Reviews" && true} />
      <ShippingPolicy show={contend === "Shipping" && true} />
    </div>
  );
};

export default ProductReviewsAndShipping;
