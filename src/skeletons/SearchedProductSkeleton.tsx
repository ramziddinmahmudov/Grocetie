import { Skeleton } from "@mui/material";

const SearchedProductSkeleton = () => {
  return (
    <div className="search-item">
      <Skeleton animation="wave" variant="rounded" width={70} height={60} />
      <Skeleton
        animation="wave"
        variant="rounded"
        width="calc(100% - 16rem)"
        height={24}
        style={{ margin: "0 1rem" }}
      />
      <Skeleton animation="wave" variant="rounded" width={70} height={24} />
    </div>
  );
};

export default SearchedProductSkeleton;
