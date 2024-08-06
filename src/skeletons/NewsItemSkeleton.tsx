import { Skeleton, Stack } from "@mui/material";

const NewsItemSkeleton = () => {
  return (
    <div className="news-card">
      <Skeleton
        className="news-card__img-box"
        animation="wave"
        variant="rounded"
        height={325}
      />
      <Stack className="news-card__content">
        <Skeleton
          animation="wave"
          variant="rounded"
          height={30}
          width="100%"
          style={{ marginBottom: "0.8rem" }}
        />
        <Skeleton animation="wave" variant="rounded" height={25} width={150} />
      </Stack>
    </div>
  );
};

export default NewsItemSkeleton;
