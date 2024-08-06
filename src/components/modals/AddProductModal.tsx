import ReactDOM from "react-dom";
import { ChangeEvent, useContext, useRef, useState } from "react";
import ModalActions from "./ModalActions";
import UploadImagesInput from "./components/UploadImagesInput";
import TextInput from "../UI/Inputs/TextInput";
import FilterOptions from "../UI/FilterOptions";
import { ImageItemTypes, ProductItemTypes } from "../../utils/user-types";
import { ProductContext } from "../../store/ProductContext";
import { useNavigate } from "react-router-dom";
import { addProduct, deleteProduct, updateProduct } from "../../api/products";
import {
  removeImagesHandler,
  setImagesHandler,
} from "../../utils/helperFunctions";
import UploadedImages from "./components/UploadedImages";
import { inStockOptions, weightOptions } from "../../data/helperData";
import { ActionTypeProps } from "../../utils/types";
import { createFormDataHandler } from "../../api/helper";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddProductOverlay = ({
  closeModal,
  text,
  images,
  categoryOptions,
  product,
}: AddProductModalTypes) => {
  const navigate = useNavigate();
  const { state: productsState, dispatch } = useContext(ProductContext);
  const axiosPrivate = useAxiosPrivate();

  const nameRef = useRef<HTMLInputElement>(null);
  const brandNameRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const storeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const featuresRef = useRef<HTMLInputElement>(null);
  const discountedPriceRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    product?.category ? product.category._id : ""
  );
  const [inStock, setInStock] = useState<string>(
    product ? String(product?.inStock) : ""
  );
  const [selectedWeightType, setSelectedWeightType] = useState<string>(
    product?.weight ? product?.weight.replace(/[^a-zA-Z]+/g, "") : "kg"
  );
  const [imagesForClient, setImagesForClient] = useState<ImageItemTypes[] | []>(
    images || []
  );
  const [imagesForServer, setImagesForServer] = useState<FileList | []>([]);

  /// This function remove the image from states which are for client and server
  const onRemoveImages = (img: ImageItemTypes): void => {
    removeImagesHandler(img, setImagesForServer, setImagesForClient);
  };

  /// This function sets uploade images to states which are for client and server
  const onSetImages = (e: ChangeEvent<HTMLInputElement>): void => {
    setImagesHandler(e, setImagesForServer, setImagesForClient);
  };

  async function onAddOrUpdateOrDeleteProduct(actionType: ActionTypeProps) {
    const productRefs = {
      nameRef,
      brandNameRef,
      weightRef,
      priceRef,
      storeRef,
      descriptionRef,
      featuresRef,
      discountedPriceRef,
    };
    const formData = createFormDataHandler(
      productRefs,
      selectedWeightType,
      product,
      selectedCategory,
      inStock
    );

    switch (actionType) {
      case "add":
        await addProduct(
          dispatch,
          axiosPrivate,
          formData,
          imagesForServer,
          closeModal
        );
        break;
      case "update":
        await updateProduct(
          dispatch,
          axiosPrivate,
          formData,
          imagesForServer,
          imagesForClient,
          closeModal,
          product as ProductItemTypes
        );
        break;
      case "delete":
        await deleteProduct(
          dispatch,
          axiosPrivate,
          closeModal,
          product?._id as string,
          navigate
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className="add-product-form">
      <div className="address-form__header">{text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput
            label="Product name*"
            placeholder="Name"
            ref={nameRef}
            defaultValue={product?.name}
          />
          <TextInput
            label="Product brandname"
            placeholder="Brandname"
            ref={brandNameRef}
            defaultValue={product?.brandName}
          />
        </div>
        <div className="form-inputs form-inputs-2">
          <div className="input">
            <label>Select Category*</label>
            <FilterOptions
              options={categoryOptions}
              title="Select Category"
              onSelect={(id: string) => setSelectedCategory(id)}
              defaultValue={product?.category.name}
            />
          </div>

          <div className="weight-inputBox">
            <TextInput
              label="Product weight"
              placeholder="250g | 1.2kg | 1L"
              ref={weightRef}
              type="number"
              defaultValue={product?.weight.replace(/kg|g|l/g, "")}
            />
            <FilterOptions
              options={weightOptions}
              title=""
              onSelect={(id: string) => setSelectedWeightType(id)}
              defaultValue={selectedWeightType}
            />
          </div>

          <TextInput
            label="Product price*"
            placeholder="Price"
            ref={priceRef}
            type="number"
            defaultValue={String(product?.price)}
          />
          <TextInput
            label="Store name*"
            placeholder="Store"
            ref={storeRef}
            defaultValue={product?.store}
          />
        </div>
        <div className="form-inputs">
          <TextInput
            label="Product description*"
            placeholder="Description"
            ref={descriptionRef}
            defaultValue={product?.description}
          />
        </div>
        <div className="form-inputs form-inputs-4">
          <TextInput
            label="Sale price (default: 0)"
            placeholder="Sale price"
            type="number"
            ref={discountedPriceRef}
            defaultValue={product?.discountedPrice || "0"}
          />
          <TextInput
            label="Product features"
            placeholder="Features"
            ref={featuresRef}
            defaultValue={product?.features}
          />

          {text.startsWith("Edit") && (
            <div className="input">
              <label>In Stock</label>
              <FilterOptions
                options={inStockOptions}
                title=""
                onSelect={(id: string) => setInStock(id)}
                defaultValue={inStock}
              />
            </div>
          )}
        </div>
        <UploadImagesInput onChange={onSetImages} />
        <UploadedImages
          images={imagesForClient}
          onRemoveImages={onRemoveImages}
        />
      </div>

      <ModalActions
        closeModal={closeModal}
        text={text}
        onAddHandler={onAddOrUpdateOrDeleteProduct.bind(null, "add")}
        onDeleteHandler={onAddOrUpdateOrDeleteProduct.bind(null, "delete")}
        onUpdateHandler={onAddOrUpdateOrDeleteProduct.bind(null, "update")}
        loading={productsState.addUpdateDeleteLoading}
      />
    </div>
  );
};

const AddProductModal = (props: AddProductModalTypes) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddProductOverlay {...props} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface AddProductModalTypes {
  closeModal: () => void;
  images?: ImageItemTypes[];
  text: string;
  categoryOptions: { name: string; _id: string }[];
  product?: ProductItemTypes;
}

export default AddProductModal;
