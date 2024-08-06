const LoadingSpinner = ({
  width,
  height,
  minHeight = true,
}: {
  width?: string;
  height?: string;
  minHeight?: boolean;
}) => {
  return (
    <div
      className="spinner"
      style={{ minHeight: minHeight ? "50vh" : "unset" }}
    >
      <img src="/assets/icons/loader.gif" alt="" />
    </div>
  );
};

export default LoadingSpinner;
