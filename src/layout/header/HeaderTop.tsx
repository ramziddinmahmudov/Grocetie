import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CartModal from "../../components/modals/CartModal";
import { CartContext } from "../../store/CartContext";
import { UserContext } from "../../store/UserContext";
import { ProductContext } from "../../store/ProductContext";
import { getCustomProducts } from "../../api/products";
import SearchItems from "./SearchItems";

const HeaderTop = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const { state: cartState } = useContext(CartContext);
  const { state } = useContext(UserContext);
  const {
    state: { searchQuery },
    dispatch,
    setSearchQuery,
  } = useContext(ProductContext);

  /// Sending request to find products
  useEffect(() => {
    // Set up debouncing

    setLoading(true);
    const timerId = setTimeout(() => {
      (async () => {
        const query = `?search_query=${searchQuery}`;
        await getCustomProducts(dispatch, "searchProducts", query);
        setLoading(false);
      })();
    }, 250); // 250ms delay

    // Cleanup function to cancel the timeout if the component unmounts
    // or the user types another letter (changing searchQuery again)
    return () => clearTimeout(timerId);
  }, [dispatch, searchQuery]);

  const validateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Regular expression pattern that allows only letters and numbers
    const pattern = /^[a-zA-Z0-9]*$/;

    // Check if the input matches the pattern
    if (pattern.test(inputValue)) {
      // If the input value matches the pattern, we set the value.
      setSearchQuery(inputValue);
    } else {
      // If input doesn't match the pattern, clear the input field
      event.target.value = inputValue.replace(/[^a-zA-Z0-9]/g, "");
    }
  };

  return (
    <>
      <Sidebar
        onCloseSidebar={() => setSidebarOpen(false)}
        open={sidebarOpen}
      />

      {cartOpen && <CartModal closeModal={() => setCartOpen(false)} />}

      <div className="header__top">
        <div className="container">
          <div className="header__top--content">
            <div
              className="header__top--sidebarBtn"
              onClick={() => setSidebarOpen(true)}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <Link to="/home" className="header__brand">
              Welcome To Groceteria
            </Link>
            <div className="header__search">
              <input
                type="text"
                placeholder="Search for products"
                onChange={(e) => validateInput(e)}
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
              />
              <img
                className="search-icon"
                src="/assets/icons/search-icon.svg"
                alt="Search Icon"
              />

              <SearchItems loading={loading} focused={focused} />
            </div>
            <div className="header__cart">
              <div className="header__cart--liked">
                <Link to="/wishlist">
                  <svg>
                    <use href="/assets/icons/icons.svg#icon-heart"></use>
                  </svg>
                </Link>
              </div>
              <div className="header__cart--bag">
                <div className="cart-bag">
                  <svg onClick={() => setCartOpen(true)}>
                    <use href="/assets/icons/icons.svg#icon-shopping-cart"></use>
                  </svg>
                  <span className="items-number">
                    {cartState.cart?.cartProducts?.length || 0}
                  </span>
                </div>
              </div>
              <div className="header__cart--auth">
                {state.user === null && (
                  <>
                    <div className="header__cart--not-logged">
                      <Link to="/auth/signin" className="login-btn">
                        Sign in
                      </Link>
                      <span> / </span>
                      <Link to="/auth/signup" className="login-btn">
                        Sign up
                      </Link>
                    </div>

                    <Link
                      to="/auth/signin"
                      className="header__not-logged--responsive"
                      children={<PersonAddAltIcon />}
                    />
                  </>
                )}

                {state.user !== null && (
                  <Link to="/my-dashboard" className="header__cart--user">
                    <img src={state.user.photo} alt="User" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
