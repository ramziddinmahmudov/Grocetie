import Banner from "../layout/banner/Banner";
import CategoriesCarousel from "../components/category/CategoriesCarousel";
import CustomProductsCarousel from "../components/CustomProductsCarousel";
import { useContext, useLayoutEffect } from "react";
import { ProductContext } from "../store/ProductContext";
import { CategoryActionKind, CategoryContext } from "../store/CategoryContext";
import { getCustomProducts } from "../api/products";
import { getCategories } from "../api/categories";

const HomePage = () => {
  const {
    state: {
      topProducts,
      topProductsLoading,
      saleProductsLoading,
      saleProducts,
    },
    dispatch,
  } = useContext(ProductContext);

  const {
    state: { categories, categoriesLoading },
    dispatch: categoryDispatch,
  } = useContext(CategoryContext);

  useLayoutEffect(() => {
    const topQuery = "?sort=-ratingsAverage&limit=9";
    const saleQuery = "?discountedPrice[gt]=0";
    categoryDispatch({ type: CategoryActionKind.GET_CATEGORIES_START });

    (async () => {
      await Promise.all([
        getCategories(categoryDispatch),
        getCustomProducts(dispatch, "saleProducts", saleQuery),
        getCustomProducts(dispatch, "topProducts", topQuery),
      ]);
    })();
  }, [dispatch, categoryDispatch]);

  return (
    <>
      <Banner />

      <CategoriesCarousel categories={categories} loading={categoriesLoading} />

      <CustomProductsCarousel
        text="Top Rated Products"
        products={topProducts}
        loading={topProductsLoading}
      />

      <CustomProductsCarousel
        text="Sale Products"
        products={saleProducts}
        loading={saleProductsLoading}
      />
    </>
  );
};

export default HomePage;
