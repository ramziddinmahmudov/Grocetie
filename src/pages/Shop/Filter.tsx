import { memo, useContext, useState } from "react";
import CloseIcon from "../../components/UI/Icons/CloseIcon";
import FilterOptions from "../../components/UI/FilterOptions";
import AddProductModal from "../../components/modals/AddProductModal";
import { CategoryContext } from "../../store/CategoryContext";
import { ProductContext } from "../../store/ProductContext";
import { productPriceOptions, ratingOptions } from "../../data/helperData";
import { UserContext } from "../../store/UserContext";
import { activeFilterTypeProps } from "../../utils/types";

const Filter = ({ productsLength }: { productsLength: number | undefined }) => {
  const { state } = useContext(UserContext);
  const [addProductModal, setAddProductModal] = useState(() => false);
  const {
    state: { categories },
  } = useContext(CategoryContext);
  const {
    state: { filters },
    addFilter,
    removeFilter,
  } = useContext(ProductContext);

  const onSetActiveFilters = (id: string, type: activeFilterTypeProps) => {
    // If the item is already in active filters, we just return.
    if (filters && filters.find((i) => i.id === id)) return;
    let customArr;
    if (type === "category") customArr = categories;
    else if (type === "price") customArr = productPriceOptions;
    else if (type === "rating") customArr = ratingOptions;
    const value = customArr?.find((i) => i._id === id)?.name!;
    addFilter({ id, value, type });
  };

  return (
    <>
      {addProductModal && (
        <AddProductModal
          text="Add Product"
          closeModal={() => setAddProductModal(false)}
          categoryOptions={categories!.map((i) => {
            return { name: i.name, _id: i._id };
          })}
        />
      )}

      <div className="filter">
        <div className="container">
          <div className="filter__top">
            {categories && (
              <FilterOptions
                options={categories.map((i) => {
                  return { name: i.name, _id: i._id };
                })}
                title="Select Category"
                onSelect={(id: string) => onSetActiveFilters(id, "category")}
                addSelectedNotAllowed
              />
            )}

            <FilterOptions
              options={productPriceOptions}
              title="Select Price"
              onSelect={(id: string) => onSetActiveFilters(id, "price")}
              addSelectedNotAllowed
            />
            <FilterOptions
              options={ratingOptions}
              title="Select Rating"
              onSelect={(id: string) => onSetActiveFilters(id, "rating")}
              addSelectedNotAllowed
            />

            {state.user && state.user.role !== "user" && (
              <button
                className="button add-button"
                onClick={() => setAddProductModal(true)}
                children="Add Product"
              />
            )}
          </div>
        </div>
        <div className="filter__bottom">
          <div className="container">
            <div className="filter__bottom--main">
              <h5>Active Filters:</h5>
              <div className="active__filters">
                {filters &&
                  filters.map((filter) => (
                    <div className="active__filter" key={filter.value}>
                      {filter.value}
                      <div onClick={removeFilter.bind(null, filter.id)}>
                        <CloseIcon />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="filter__result">
                <p>
                  {productsLength || 0}
                  <span>
                    Product{productsLength && productsLength > 1 ? "s" : ""}{" "}
                    found.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Filter);
