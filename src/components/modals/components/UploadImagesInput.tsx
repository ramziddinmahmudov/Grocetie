const UploadImagesInput = ({ onChange }: UploadImagesProps) => {
  return (
    <div className="upload-image">
      <span>
        <img src="/assets/icons/upload-icon.svg" alt="" />
      </span>
      <p>Drag your images here (up to 10)</p>
      <em>(Only *.jpeg, *.jpg and *.png images will be accepted.)</em>
      <input
        className="upload-image__input"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        multiple
        onChange={onChange}
      />
    </div>
  );
};

interface UploadImagesProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default UploadImagesInput;
