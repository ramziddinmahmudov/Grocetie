import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWrapper from "./layout/LayoutWrapper";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop/Shop";
import AboutUs from "./pages/AboutShop/AboutUs";
import ContactUs from "./pages/AboutShop/ContactUs";
import CustomerCenter from "./pages/AboutShop/CustomerCenter";
import TermsAndPrivacy from "./pages/AboutShop/TermsAndPrivacy";
import NewsPage from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import OrderHistory from "./pages/OrderHistory";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/User/Wishlist";
import Cart from "./pages/User/Cart";
import Compare from "./pages/User/Compare";
import Checkout from "./pages/User/Checkout";
import Dashboard from "./pages/User/Dashboard";
import Settings from "./pages/User/Settings";
import OrderDetails from "./pages/User/OrderDetails";
import Statistics from "./pages/Admin/Statistics";
import CustomerDetails from "./pages/Admin/CustomerDetails";
import Categories from "./pages/User/Categories";
import Customers from "./pages/Admin/Customers";
import { useCallback, useContext, useLayoutEffect } from "react";
import { ToastContainer, Flip } from "react-toastify";
import CartIcon from "./components/UI/Icons/CartIcon";
import "react-toastify/dist/ReactToastify.css";
import ProductsByCategory from "./pages/User/ProductsByCategory";
import { UserActionKind, UserContext } from "./store/UserContext";
import AuthPages from "./pages/Auth/AuthPages";
import { Analytics } from "@vercel/analytics/react";
import { AuthContext } from "./store/AuthContext";
import useRefreshToken from "./hooks/auth/useRefresh";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const refresh = useRefreshToken(dispatch);

  const verifyRefreshToken = useCallback(async () => {
    dispatch({ type: UserActionKind.GETME_START });
    await refresh();
  }, [refresh, dispatch]);

  useLayoutEffect(() => {
    if (!auth.accessToken && user) verifyRefreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, auth.accessToken]);

  return (
    <>
      <LayoutWrapper>
        <Analytics />
        <SpeedInsights />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          style={{ fontSize: "1.5rem" }}
          pauseOnFocusLoss={false}
          newestOnTop={true}
          transition={Flip}
          draggablePercent={60}
          icon={<CartIcon />}
          limit={1}
        />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/my-cart" element={<Cart />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/my-dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/categories/:categoryId"
            element={<ProductsByCategory />}
          />

          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-privacy" element={<TermsAndPrivacy />} />
          <Route path="/customer-center" element={<CustomerCenter />} />
          <Route path="/products/:productId" element={<ProductDetails />} />

          {/* User logged in routes */}
          {user !== null && (
            <>
              <Route path="/settings" element={<Settings />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/news/:newsId" element={<NewsDetails />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
            </>
          )}

          {user === null && <Route path="/auth/*" element={<AuthPages />} />}

          {/* Admin and Manager routes */}
          {user && ["admin", "manager"].includes(user.role) && (
            <>
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/customers" element={<Customers />} />
              <Route
                path="/customers/:customerId"
                element={<CustomerDetails />}
              />
            </>
          )}

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </LayoutWrapper>
    </>
  );
}

export default App;
