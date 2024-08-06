import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { ImageItemTypes } from "../../../utils/user-types";

export default function ProductImagesSlider({
  images,
  inStock,
}: {
  images: ImageItemTypes[];
  inStock: boolean;
}) {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{
        dynamicBullets: true,
      }}
      className="mySwiper product__gallery"
    >
      {!inStock && (
        <span className="stock-out product__gallery--stock-out">
          Out of Stock
        </span>
      )}
      {images.map((item) => (
        <SwiperSlide className="slide" key={item._id}>
          <img
            className="gallery-image"
            src={item.imageUrl}
            alt=""
            draggable={false}
          />
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
}
