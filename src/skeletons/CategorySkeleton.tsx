import Skeleton from "@mui/material/Skeleton";

const CategorySkeleton = () => {
  return (
    <>
      <div className="category__item">
        <Skeleton animation="wave" variant="rounded" width={80} height={80} />
        <Skeleton
          animation="wave"
          variant="rounded"
          width="90%"
          height={27}
          style={{ marginTop: 16 }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width="60%"
          height={21}
          style={{ marginTop: 6 }}
        />
      </div>
    </>
  );
};

export default CategorySkeleton;
