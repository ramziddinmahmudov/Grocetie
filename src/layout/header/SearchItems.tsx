import { useContext } from "react";
import { Link } from "react-router-dom";
import SearchedProductSkeleton from "../../skeletons/SearchedProductSkeleton";
import { ProductContext } from "../../store/ProductContext";

const SearchItems = ({
  loading,
  focused,
}: {
  loading: boolean;
  focused: boolean;
}) => {
  const {
    state: { searchProducts, searchQuery },
  } = useContext(ProductContext);
  return (
    <>
      {focused && (
        <div className="header__search--items-box">
          <div className="search-items-list">
            {loading &&
              Array.from({ length: 10 }).map((_, i) => (
                <SearchedProductSkeleton key={i} />
              ))}
            {!loading &&
              searchProducts?.map((item) => (
                <Link
                  to={`/products/${item._id}`}
                  className="search-item"
                  key={item._id}
                >
                  <img
                    className="search-item__img"
                    src={item.images[0].imageUrl}
                    alt=""
                  />
                  <h2 className="search-item__name">
                    {item.features ? <span>[{item.features}] </span> : ""}
                    {item.name}
                  </h2>
                  <p>
                    $
                    {item.discountedPrice
                      ? item.discountedPrice.toFixed(2)
                      : item.price.toFixed(2)}
                  </p>
                </Link>
              ))}
            {!loading && searchProducts?.length === 0 && searchQuery && (
              <h1>No products found.</h1>
            )}
            {!searchQuery && !loading && <h1>Search for products...</h1>}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchItems;
