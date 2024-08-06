import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageItemTypes } from "../../../utils/user-types";

const NewsImagesSlider = ({ images }: { images: ImageItemTypes[] }) => {
  return (
    <Swiper className="news-slider" pagination={true} modules={[Pagination]}>
      {images.map((image: ImageItemTypes) => (
        <SwiperSlide key={image._id}>
          <img className="news__image" src={image.imageUrl} alt=""></img>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default NewsImagesSlider;
