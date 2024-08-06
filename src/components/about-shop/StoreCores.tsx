import { Link } from "react-router-dom";
import RightArrowIcon from "../UI/Icons/RightArrowIcon";
import { MotoItemTypes } from "../../utils/types";

const motos: MotoItemTypes[] = [
  { id: 1, motoText: "Sed in metus pellentesque." },
  {
    id: 2,
    motoText: "Fusce et ex commodo, aliquam nulla efficitur.",
  },
  { id: 3, motoText: "Maecenas ut nunc fringilla erat varius." },
];

const StoreCores = () => {
  return (
    <>
      <div className="section-lg">
        <div className="container">
          <div className="hero">
            <div className="hero__text">
              <h5>100% Trusted Grocery Food Store</h5>
              <p>
                Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi,
                laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies
                elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at
                accumsan. Donec a eros non massa vulputate ornare. Vivamus
                ornare commodo ante, at commodo felis congue vitae.
              </p>
            </div>
            <div className="hero__img">
              <img src="/assets/images/banner/banner-1.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="section-lg hero-2">
        <div className="container">
          <div className="hero">
            <div className="hero__img">
              <img src="/assets/images/banner/banner-1.jpeg" alt="" />
            </div>
            <div className="hero__text">
              <h5>We Deliver, You Enjoy Your Order.</h5>
              <p>
                Ut suscipit egestas suscipit. Sed posuere pellentesque nunc,
                ultrices consectetur velit dapibus eu. Mauris sollicitudin
                dignissim diam, ac mattis eros accumsan rhoncus. Curabitur
                auctor bibendum nunc eget elementum.
              </p>
              <div className="hero__info">
                {motos.map((moto: MotoItemTypes) => (
                  <div className="hero__info--item" key={moto.id}>
                    <span>
                      <svg>
                        <use href="/assets/icons/icons.svg#icon-check-circle"></use>
                      </svg>
                    </span>
                    <p>{moto.motoText}</p>
                  </div>
                ))}
              </div>
              <Link to="/shop" className="banner__shop-now button">
                Shop Now
                <RightArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreCores;
