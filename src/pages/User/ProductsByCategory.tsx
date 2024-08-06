import { useContext, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../store/CategoryContext";
import { getCategory } from "../../api/categories";
import ProductCard from "../../components/productcard/ProductCard";
import { ProductItemTypes } from "../../utils/user-types";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import EmptyOrErrorContainer from "../../components/EmptyOrErrorContainer";

const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const {
    state: { category, categoryLoading, error },
    dispatch,
  } = useContext(CategoryContext);

  useLayoutEffect(() => {
    (async () => {
      await getCategory(dispatch, categoryId!);
    })();
  }, [dispatch, categoryId]);

  if (categoryLoading) return <LoadingSpinner />;

  return (
    <div className="section-sm products-by-category">
      <div className="section__head">
        <h2>{category?.name}</h2>
      </div>
      <div className="container">
        {category?.products?.length! > 0 && (
          <div className="all-products">
            {category?.products?.map((item: ProductItemTypes) => (
              <ProductCard
                item={{
                  ...item,
                  category: {
                    _id: category._id,
                    name: category.name,
                  },
                }}
                key={item._id}
              />
            ))}
          </div>
        )}

        {category?.products?.length! === 0 && (
          <EmptyOrErrorContainer
            text={`Sorry, we couldn't find any products.`}
          />
        )}

        {error && <EmptyOrErrorContainer error={error} />}
      </div>
    </div>
  );
};

export default ProductsByCategory;
