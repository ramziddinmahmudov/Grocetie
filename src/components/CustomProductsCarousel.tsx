import "swiper/css";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./productcard/ProductCard";
import SectionHead from "./UI/SectionHeader";
import { ProductItemTypes } from "../utils/user-types";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

const CustomProductsCarousel = ({
  text,
  products,
  loading,
}: CustomProductsCarouselProps) => {
  if ((!products || products.length === 0) && !loading) return <></>;

  return (
    <div className="section-sm">
      <div className="container custom-products-box">
        <SectionHead text={text} />
        <Swiper
          grabCursor={true}
          modules={[Autoplay]}
          slidesPerView="auto"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <SwiperSlide key={i} style={{ width: "25rem" }}>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {products?.map((product: ProductItemTypes) => (
                <SwiperSlide key={product._id} style={{ width: "25rem" }}>
                  <ProductCard key={product._id} item={product} />
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      </div>
    </div>
  );
};

interface CustomProductsCarouselProps {
  text: string;
  products: ProductItemTypes[] | null;
  loading?: boolean;
}

export default CustomProductsCarousel;
