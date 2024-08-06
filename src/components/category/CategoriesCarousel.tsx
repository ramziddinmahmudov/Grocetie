import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import RightArrowIcon from "../UI/Icons/RightArrowIcon";
import { Link } from "react-router-dom";
import { CategoryItemTypes } from "../../utils/user-types";
import CategoryItem from "./CategoryItem";
import CategorySkeleton from "../../skeletons/CategorySkeleton";

const CategoriesCarousel = ({
  categories,
  loading,
}: {
  categories: CategoryItemTypes[] | null;
  loading: boolean;
}) => {
  if ((!categories || categories.length === 0) && !loading) return <></>;
  return (
    <div className="category">
      <div className="container">
        <div
          className="section__head"
          style={{ justifyContent: "space-between" }}
        >
          <h2>Shop By Categories</h2>
          <Link to="/categories" className="view-all">
            View All
            <RightArrowIcon />
          </Link>
        </div>

        <Swiper
          grabCursor={true}
          modules={[Autoplay]}
          slidesPerView="auto"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          draggable={true}
        >
          {loading && !categories ? (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <CategorySkeleton />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {categories?.map((category: CategoryItemTypes) => (
                <SwiperSlide key={category._id}>
                  <CategoryItem category={category} key={category._id} />
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoriesCarousel;
