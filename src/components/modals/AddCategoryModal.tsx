import { useContext, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ModalActions from "./ModalActions";
import TextInput from "../UI/Inputs/TextInput";
import { addOrUpdateCategory, deleteCategory } from "../../api/categories";
import { CategoryContext } from "../../store/CategoryContext";
import { CategoryItemTypes } from "../../utils/user-types";
import { ActionTypeProps } from "../../utils/types";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddCategoryOverlay = ({
  text,
  closeModal,
  category,
}: AddCategoryModalProps) => {
  const [uploadedImage, setUploadedImage] = useState<string>(
    category?.image.imageUrl || ""
  );
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const axiosPrivate = useAxiosPrivate();

  const {
    state: { categories, addUpdateDeleteError, categoryLoading },
    dispatch,
  } = useContext(CategoryContext);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files![0];
    if (!file) return;
    const image = URL.createObjectURL(file);
    setUploadedImage(image);
  };

  const onRemoveImage = () => {
    const input = document.getElementById("image-input") as HTMLInputElement;
    setUploadedImage("");
    // The reason why I set input.value to empty string is that when I re-upload an image, onChange does not get triggered because onChange only gets triggered when the value in target control changes.
    input.value = "";
  };

  async function onAddDeleteUpdateCategory(actionType: ActionTypeProps) {
    if (!categories) return;
    const name = nameRef.current?.value;
    const image = imageRef.current?.files![0];
    const formData = new FormData();
    formData.append("name", name as string);
    uploadedImage.startsWith("blob") && formData.append("image", image as Blob);

    switch (actionType) {
      case "add":
        if (name === "" && !uploadedImage) {
          closeModal();
          return;
        }
        await addOrUpdateCategory(
          categories,
          dispatch,
          formData,
          closeModal,
          "POST",
          axiosPrivate
        );
        break;
      case "update":
        /// We just close the modal if the user does not change anything.
        const sameName = name?.toLowerCase() === category?.name.toLowerCase();
        if ((sameName && !uploadedImage.startsWith("blob")) || !uploadedImage) {
          closeModal();
          return;
        }
        await addOrUpdateCategory(
          categories,
          dispatch,
          formData,
          closeModal,
          "PATCH",
          axiosPrivate,
          category?._id
        );
        break;
      case "delete":
        await deleteCategory(
          categories,
          dispatch,
          category?._id!,
          axiosPrivate
        );
        break;

      default:
        break;
    }
  }

  return (
    <div className="add-product-form ">
      <div className="address-form__header">{text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput
            label="Category Name*"
            placeholder="Category Name"
            ref={nameRef}
            defaultValue={category?.name}
          />
        </div>
        <div className="upload-image">
          <span>
            <img src="/assets/icons/upload-icon.svg" alt="" />
          </span>
          <p>Drag your image here (only 1)</p>
          <em>(Only *.jpeg, *.jpg and *.png images will be accepted.)</em>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            disabled={uploadedImage ? true : false}
            onChange={onSelectFile}
            ref={imageRef}
            id="image-input"
          />
        </div>
        {uploadedImage && (
          <div className="uploaded">
            <div className="uploaded__item">
              <button children="Remove" onClick={onRemoveImage} />
              <img src={uploadedImage} alt="" />
            </div>
          </div>
        )}
      </div>
      {addUpdateDeleteError && !categoryLoading && (
        <div className="error-container">
          <h1>{addUpdateDeleteError}</h1>
        </div>
      )}
      <ModalActions
        text={text}
        closeModal={closeModal}
        onUpdateHandler={onAddDeleteUpdateCategory.bind(null, "update")}
        onAddHandler={onAddDeleteUpdateCategory.bind(null, "add")}
        onDeleteHandler={onAddDeleteUpdateCategory.bind(null, "delete")}
        loading={categoryLoading}
      />
    </div>
  );
};

const AddCategoryModal = (props: AddCategoryModalProps) => {
  const { clearError } = useContext(CategoryContext);

  const closeModalHandler = () => {
    props.closeModal();
    clearError();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModalHandler} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddCategoryOverlay
          closeModal={closeModalHandler}
          text={props.text}
          category={props.category}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface AddCategoryModalProps {
  closeModal: () => void;
  text: string;
  category?: CategoryItemTypes;
}

export default AddCategoryModal;
