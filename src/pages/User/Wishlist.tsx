import WishlistedItem from "../../components/WishlistedItem";
// import CustomProductsCarousel from "../../components/CustomProductsCarousel";
import SectionHead from "../../components/UI/SectionHeader";
import { useContext, useEffect, useLayoutEffect } from "react";
import LoginFirst from "../../components/LoginFirst";
import { UserActionKind, UserContext } from "../../store/UserContext";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { getCompareOrWishlist } from "../../api/user";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { AuthContext } from "../../store/AuthContext";

const Wishlist = () => {
  const {
    state: { user, compareWishlistLoading, wishlisted, compareWishlistError },
    dispatch,
  } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useLayoutEffect(() => {
    dispatch({ type: UserActionKind.GET_COMPARE_OR_WISHLIST_START });
  }, [dispatch]);

  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => {
      await getCompareOrWishlist(dispatch, axiosPrivate, "wishlisted");
    })();
  }, [dispatch, axiosPrivate, auth.accessToken]);

  if (user === null) return <LoginFirst />;
  if (compareWishlistLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="section-md wishlist">
        <div className="container">
          <SectionHead text="My Wishlist" />
          <div className="wishlist__table">
            <table>
              <tbody>
                {wishlisted?.map((item) => (
                  <WishlistedItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    inStock={item.inStock}
                    image={item.images[0].imageUrl}
                    price={item.price}
                    discountedPrice={item.discountedPrice}
                  />
                ))}

                {wishlisted?.length === 0 && (
                  <tr className="wishlist-cart__empty">
                    <td>
                      <h2>No wishlisted products yet</h2>
                    </td>
                  </tr>
                )}

                {compareWishlistError && (
                  <tr className="wishlist-cart__error">
                    <td>
                      <h2>{compareWishlistError}</h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <CustomProductsCarousel text="Wanna add more to your wishlist?" /> */}
    </>
  );
};

export default Wishlist;
