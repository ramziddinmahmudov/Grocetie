import { Link } from "react-router-dom";
import UserIcon from "../UI/Icons/UserIcon";
import LogoutIcon from "../UI/Icons/LogoutIcon";
import CategroyIcon from "../UI/Icons/CategroyIcon";
import WishlistIcon from "../UI/Icons/WishlistIcon";
import SettingsIcon from "../UI/Icons/SettingsIcon";
import DashboardIcon from "../UI/Icons/DashboardIcon";
import StatisticsIcon from "../UI/Icons/StatisticsIcon";
import ShoppingCartIcon from "../UI/Icons/ShoppingCartIcon";
import OrderHistoryIcon from "../UI/Icons/OrderHistoryIcon";
import { memo, useContext, useState } from "react";
import { logout } from "../../api/auth";
import { AuthContext } from "../../store/AuthContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { UserContext } from "../../store/UserContext";

const navUserItems = [
  {
    name: "Dashboard",
    link: "/my-dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Order History",
    link: "/orders",
    icon: <OrderHistoryIcon />,
  },
  {
    name: "Wishlist",
    link: "/wishlist",
    icon: <WishlistIcon />,
  },
  {
    name: "Shopping Cart",
    link: "/my-cart",
    icon: <ShoppingCartIcon />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

const navAdminItems = [
  {
    name: "Dashboard",
    link: "/my-dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Order History",
    link: "/orders",
    icon: <OrderHistoryIcon />,
  },
  {
    name: "Customers",
    link: "/customers",
    icon: <UserIcon />,
  },
  {
    name: "Statistics",
    link: "/statistics",
    icon: <StatisticsIcon />,
  },
  {
    name: "Categories",
    link: "/categories",
    icon: <CategroyIcon />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

const DashboardNav = ({ activeNavItem }: { activeNavItem: string }) => {
  const [navOpen, setNavOpen] = useState<boolean>(() => false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const { state } = useContext(UserContext);
  const { setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  const navItems = state.user?.role === "user" ? navUserItems : navAdminItems;

  const onLogoutHandler = async () => {
    setLogoutLoading(true);
    await logout(setAuth, axiosPrivate);
    setLogoutLoading(false);
  };

  return (
    <div className={`dashboard__nav${navOpen ? " nav-open" : ""}`}>
      <div
        className="dashboard__nav--head"
        onClick={() => setNavOpen((prev) => !prev)}
      >
        <h5>Navigation</h5>
        <img src="/assets/icons/arrow-down-icon.svg" alt="" />
      </div>
      <ul>
        {navItems.map((item) => (
          <Link
            to={item.link}
            key={item.name}
            className={`dashboard__nav--item ${
              item.name === activeNavItem ? "active" : ""
            }`}
          >
            <span>{item.icon}</span>
            <p>{item.name}</p>
          </Link>
        ))}
        <button onClick={onLogoutHandler} disabled={logoutLoading && true}>
          <li className="dashboard__nav--item">
            <span>
              <LogoutIcon />
            </span>
            <p>Log out</p>
          </li>
        </button>
      </ul>
    </div>
  );
};

export default memo(DashboardNav);
