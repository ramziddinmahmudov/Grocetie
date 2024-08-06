import { useState } from "react";
import { CategoryItemTypes } from "../../utils/user-types";
import AddCategoryModal from "../modals/AddCategoryModal";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({
  category,
  forAdmin,
}: {
  category: CategoryItemTypes;
  forAdmin?: boolean;
}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(() => false);

  const navigateHandler = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("add-button"))
      setOpenModal(true);
    else navigate(`/categories/${category._id}`);
  };

  return (
    <>
      {openModal && (
        <AddCategoryModal
          text="Edit Category"
          category={category}
          closeModal={() => setOpenModal(false)}
        />
      )}

      <div className="category__item" onClick={navigateHandler}>
        <img src={category.image.imageUrl} alt="" />
        <h5>{category.name}</h5>
        <div className="quantity">{category.numberOfProducts} Products</div>
        {forAdmin && <button className="button add-button" children="Edit" />}
      </div>
    </>
  );
};

export default CategoryItem;
