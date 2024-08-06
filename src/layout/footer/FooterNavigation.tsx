import { Link } from "react-router-dom";

const myAccountItems = [
  { name: "My Dashboard", link: "/my-dashboard" },
  { name: "Order History", link: "/orders" },
  { name: "My Cart", link: "/my-cart" },
  { name: "Wishlist", link: "/wishlist" },
];
const myHelpsItems = [
  { name: "Contact Us", link: "/contact-us" },
  { name: "Customer Center", link: "/customer-center" },
  { name: "Terms & Privacy", link: "/terms-privacy" },
  { name: "About Us", link: "/about-us" },
];

const FooterNavigation = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const items = text === "My Account" ? myAccountItems : myHelpsItems;

  return (
    <ul className={`footer__navigation ${className}`}>
      <li className="footer__navigation--title">{text}</li>
      {items.map((item, i) => (
        <li className="footer__navigation--link" key={i}>
          <Link to={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterNavigation;
