import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="product-item">
      <Skeleton
        animation="wave"
        variant="rounded"
        className="product-item__img-box"
        height={200}
      />
      <Stack className="product-item__details" style={{ gap: "0.5rem" }}>
        <Skeleton animation="wave" variant="rounded" height={21} width="75%" />
        <Skeleton animation="wave" variant="rounded" width="100%" height={25} />

        <Stack
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "0.5rem",
          }}
        >
          <Skeleton
            animation="wave"
            width={90}
            height={35}
            variant="rounded"
            style={{ borderRadius: "17rem" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width="50%"
            height={35}
            style={{ borderRadius: "4.3rem" }}
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default ProductCardSkeleton;
