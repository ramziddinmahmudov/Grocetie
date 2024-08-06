import { Link } from "react-router-dom";
import RightArrowIcon from "../../components/UI/Icons/RightArrowIcon";

const Banner = () => {
  return (
    <section className="banner">
      <div className="container">
        <div className="banner__content">
          <div className="banner__text-content">
            <h5 className="title">Welcome to Groceteria</h5>
            <h2>Fresh, Healthy And Halal Products</h2>
            <h6>
              Sale Up To
              <span> 30% OFF</span>
            </h6>
            <p className="banner__shipping">
              Free shipping on your over 50$ order. We deliver, you enjoy!
            </p>
            <Link to="/shop" className="banner__shop-now button">
              Shop Now
              <RightArrowIcon />
            </Link>
          </div>
          <div className="banner__photo">
            <img src="/assets/images/banner/banner-1.jpeg" alt="banner" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
