import SocialAppsIcons from "../../components/UI/SocialAppsIcons";
import FooterMobile from "./FooterMobile";
import FooterNavigation from "./FooterNavigation";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand-info">
            <h4>Groceteria</h4>
            <p>
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
              dui.
            </p>
            <div className="footer__brand-contact">
              <span>+821057012806</span> or <span>groceteria@gmail.com</span>
            </div>
          </div>
          <div className="footer__navigation-container">
            <FooterNavigation text="My Account" />
            <FooterNavigation text="My Help" />
          </div>

          <FooterMobile />
        </div>
        <div className="footer__bottom">
          <SocialAppsIcons />
          <p className="footer__copyright">
            Groceteria © 2024. All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
