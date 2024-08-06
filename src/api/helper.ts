import {
  ImageItemTypes,
  NewsItemTypes,
  ProductItemTypes,
} from "../utils/user-types";

export const determineImageUploadConditions = (
  imagesForServer: FileList | [],
  imagesForClient: ImageItemTypes[],
  item: ProductItemTypes | NewsItemTypes | undefined,
  formData: FormData
): FormData => {
  // 1.When the admin only delete some of the current images
  const onlyDeleteCondition =
    imagesForServer.length === 0 &&
    item?.images.length! > imagesForClient.length;
  if (onlyDeleteCondition) {
    formData.append("notDeletedImages", JSON.stringify(imagesForClient));
  }

  // 2. When admin only adds new images without deleting current ones
  const onlyAddCondition =
    imagesForServer.length > 0 &&
    item?.images.length! ===
      imagesForClient.filter((i) => i.cloudinaryId !== undefined).length;

  if (onlyAddCondition) {
    for (let i = 0; i < imagesForServer.length; i++) {
      formData.append("images", imagesForServer[i] as Blob);
    }
  }

  // 3. When admin both deletes some of the current images and adds new images.
  const bothAddAndDeleteCondition =
    imagesForServer.length > 0 &&
    imagesForClient.length >= 0 &&
    item?.images.length! !==
      imagesForClient.filter((i) => i.cloudinaryId !== undefined).length;

  if (bothAddAndDeleteCondition) {
    const notDeletedImages = imagesForClient.filter(
      (i) => i.cloudinaryId !== undefined
    );
    for (let i = 0; i < imagesForServer.length; i++) {
      formData.append("images", imagesForServer[i] as Blob);
    }
    formData.append("notDeletedImages", JSON.stringify(notDeletedImages));
  }

  return formData;
};

export const createFormDataHandler = (
  productRefs: {
    nameRef: React.RefObject<HTMLInputElement>;
    brandNameRef: React.RefObject<HTMLInputElement>;
    weightRef: React.RefObject<HTMLInputElement>;
    priceRef: React.RefObject<HTMLInputElement>;
    storeRef: React.RefObject<HTMLInputElement>;
    descriptionRef: React.RefObject<HTMLInputElement>;
    featuresRef: React.RefObject<HTMLInputElement>;
    discountedPriceRef: React.RefObject<HTMLInputElement>;
  },
  weightType: string,
  product: ProductItemTypes | undefined,
  selectedCategory: string,
  inStock: string
) => {
  const name = productRefs.nameRef.current?.value;
  const brandName = productRefs.brandNameRef.current?.value;
  const weight = productRefs.weightRef.current?.value;
  const price = productRefs.priceRef.current?.value;
  const store = productRefs.storeRef.current?.value;
  const description = productRefs.descriptionRef.current?.value;
  const features = productRefs.featuresRef.current?.value;
  const discountedPrice = productRefs.discountedPriceRef.current?.value;

  const formData = new FormData();
  formData.append("name", name as string);
  formData.append("brandName", brandName as string);
  formData.append("weight", `${weight}${weightType}` as string);
  formData.append("price", price as string);
  formData.append("store", store as string);
  formData.append("description", description as string);
  formData.append("features", features as string);
  formData.append("discountedPrice", discountedPrice as string);
  formData.append("inStock", inStock ? inStock : "");
  // This will be needed in the backend when changing the category of the product
  if (product?.category && product?.category._id !== selectedCategory)
    formData.append("category", `New ${selectedCategory}` as string);
  else formData.append("category", selectedCategory as string);

  return formData;
};
