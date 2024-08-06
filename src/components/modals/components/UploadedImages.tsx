import { ImageItemTypes } from "../../../utils/user-types";

const UploadedImages = ({ images, onRemoveImages }: UploadedImagesProps) => {
  return (
    <>
      {images.length > 10 && <h3>You can upload up to 10 images!</h3>}
      {images.length > 0 && (
        <div className="uploaded">
          {images.map((img: ImageItemTypes, i: number) => (
            <div className="uploaded__item" key={i}>
              <button
                onClick={onRemoveImages.bind(null, img)}
                children="Remove"
              />
              <img src={img.imageUrl} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

interface UploadedImagesProps {
  images: ImageItemTypes[];
  onRemoveImages: (img: ImageItemTypes) => void;
}

export default UploadedImages;
