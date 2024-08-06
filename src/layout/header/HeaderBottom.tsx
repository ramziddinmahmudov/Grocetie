import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../store/UserContext";

const navUserItems = [
  {
    name: "Home",
    link: "/home",
  },
  {
    name: "Shop",
    link: "/shop",
  },
  {
    name: "About us",
    link: "/about-us",
  },
  {
    name: "News",
    link: "/news",
  },
  {
    name: "My Cart",
    link: "/my-cart",
  },
  {
    name: "Compare",
    link: "/compare",
  },
];

const navAdminItems = [
  {
    name: "Home",
    link: "/home",
  },
  {
    name: "Shop",
    link: "/shop",
  },
  {
    name: "About us",
    link: "/about-us",
  },
  {
    name: "News",
    link: "/news",
  },
  {
    name: "Customers",
    link: "/customers",
  },
  {
    name: "Compare",
    link: "/compare",
  },
];

const HeaderBottom = () => {
  const { state } = useContext(UserContext);

  // If user is not logged in or logged in, "navUserItems" will appear. If admin or manager is logged in, "navAdminItems" will appear.
  const navItems =
    state.user?.role === "user"
      ? navUserItems
      : state.user === null
      ? navUserItems
      : navAdminItems;

  return (
    <>
      <div className="header__bottom">
        <div className="container">
          <div className="header__bottom--context">
            <ul className="header__nav">
              {navItems.map((item) => (
                <li className="header__nav--link" key={item.name}>
                  <NavLink to={item.link} className="nav--link-item">
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="header__location">
              <img src="/assets/icons/location-icon.png" alt="Location Icon" />
              <span>Lincoln- 344, Illinois, Chicago</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderBottom;
