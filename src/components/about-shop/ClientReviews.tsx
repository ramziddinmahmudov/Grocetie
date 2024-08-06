import "swiper/css";
import { Autoplay } from "swiper";
import ClientReviewItem from "./ClientReviewItem";
import { Swiper, SwiperSlide } from "swiper/react";

const reviews = [1, 2, 3, 4, 5, 6, 7];

const ClientReviews = () => {
  return (
    <div className="section-lg client-reviews-container">
      <div className="container">
        <div className="section__head">
          <h2>Client Testimonials</h2>
        </div>
        <div className="client-reviews">
          <Swiper
            grabCursor={true}
            modules={[Autoplay]}
            slidesPerView="auto"
            draggable={true}
            loop={true}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review} className="client-reviews-carousel">
                <ClientReviewItem />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ClientReviews;
