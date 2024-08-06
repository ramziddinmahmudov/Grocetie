import ProductInfo from "../components/product-details/ProductInfo";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect } from "react";
import { ProductContext } from "../store/ProductContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getCustomProducts, getProduct } from "../api/products";
import ProductReviewsAndShipping from "../components/product-details/ProductReviewsAndShipping";
import EmptyOrErrorContainer from "../components/EmptyOrErrorContainer";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const {
    state: {
      productLoading,
      product,
      relatedProducts,
      relatedProductsLoading,
      productErr,
    },
    dispatch,
  } = useContext(ProductContext);

  useLayoutEffect(() => {
    (async () => {
      await getProduct(dispatch, productId!, navigate);
    })();
  }, [dispatch, productId, navigate]);

  useEffect(() => {
    if (product && product._id === productId) {
      const query = `?category=${product.category._id}`;
      (async () => {
        await getCustomProducts(dispatch, "relatedProducts", query);
      })();
    }
  }, [dispatch, product, productId]);

  return (
    <>
      {productLoading && <LoadingSpinner />}
      {!productLoading && product && (
        <>
          <ProductInfo product={product} />
          <ProductReviewsAndShipping />
          <CustomProductsCarousel
            text="Related Products"
            products={
              relatedProducts?.filter((i) => i._id !== productId) || null
            }
            loading={relatedProductsLoading}
          />
        </>
      )}

      {productErr && <EmptyOrErrorContainer error={productErr} />}
    </>
  );
};

export default ProductDetails;
