import { useContext, useState } from "react";
import ProductActions from "./ProductActions";
import RatingsStars from "../UI/RatingsStars";
import AddProductModal from "../modals/AddProductModal";
import SocialShareModal from "../modals/SocialShareModal";
import ProductImagesSlider from "../UI/Slider/ProductImagesSlider";
import { ProductItemTypes } from "../../utils/user-types";
import { CategoryContext } from "../../store/CategoryContext";
import { UserContext } from "../../store/UserContext";

const ProductInfo = ({ product }: { product: ProductItemTypes }) => {
  const { state } = useContext(UserContext);
  const {
    state: { categories },
  } = useContext(CategoryContext);
  const [shareModal, setShareModal] = useState(() => false);
  const [addProductModal, setAddProductModal] = useState(() => false);

  let discountPercent: number = 0;
  if (product.discountedPrice > 0) {
    const priceGap = product.price - product.discountedPrice;
    discountPercent = priceGap / (product.price / 100);
  }

  return (
    <>
      {shareModal && (
        <SocialShareModal
          text="product"
          closeModal={() => setShareModal(false)}
          url={`${window.location.origin}/products/${product._id}`}
        />
      )}
      {addProductModal && (
        <AddProductModal
          text="Edit Product"
          images={product.images}
          closeModal={() => setAddProductModal(false)}
          product={product}
          categoryOptions={categories!.map((i) => {
            return { name: i.name, _id: i._id };
          })}
        />
      )}

      <div className="product__details">
        <div className="container">
          <div className="product__content">
            <ProductImagesSlider
              images={product.images}
              inStock={product.inStock}
            />
            <div className="product__info">
              <div className="product__info--item">
                {state.user && state.user.role !== "user" && (
                  <button
                    className="button edit-news"
                    onClick={() => setAddProductModal(!shareModal)}
                    children="Edit Product"
                  />
                )}
                <div className="product__info--title">
                  {product.brandName ? `[${product.brandName}]` : ""}{" "}
                  {product.features ? product.features : ""} {product.name}{" "}
                  {product.weight ? product.weight : ""}
                </div>
                <div className="product__info--ratings">
                  <RatingsStars
                    ratingsAverage={product.ratingsAverage}
                    ratingsQuantity={product.ratingsQuantity}
                  />
                </div>
                <div className="product__info--price">
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

                  {!product.discountedPrice && (
                    <h2>${product.price.toFixed(2)}</h2>
                  )}
                </div>
              </div>
              <div className="product__info--item">
                <div className="product__info--share">
                  <span>Share product: </span>
                  <img
                    onClick={() => setShareModal(!shareModal)}
                    className="news__share"
                    src="/assets/icons/share-icon.svg"
                    alt=""
                  />
                </div>
                <p className="description">{product.description}</p>
              </div>
              <ProductActions
                category={product.category.name}
                store={product.store}
                inStock={product.inStock}
                id={product._id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
