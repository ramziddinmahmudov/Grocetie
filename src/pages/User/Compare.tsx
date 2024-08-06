import { useContext, useEffect, useLayoutEffect } from "react";
import CompareItem from "../../components/compare/CompareItem";
import LoginFirst from "../../components/LoginFirst";
import { UserActionKind, UserContext } from "../../store/UserContext";
import { getCompareOrWishlist } from "../../api/user";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import EmptyOrErrorContainer from "../../components/EmptyOrErrorContainer";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import { AuthContext } from "../../store/AuthContext";

const Compare = () => {
  const {
    state: { user, compareWishlistLoading, compare, compareWishlistError },
    dispatch,
  } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  useLayoutEffect(() => {
    dispatch({ type: UserActionKind.GET_COMPARE_OR_WISHLIST_START });
  }, [auth.accessToken, dispatch]);

  useEffect(() => {
    if (!auth.accessToken) return;
    (async () => {
      await getCompareOrWishlist(dispatch, axiosPrivate, "compare");
    })();
  }, [dispatch, axiosPrivate, auth.accessToken]);

  if (user === null) return <LoginFirst />;

  return (
    <div className="section-lg">
      <div className="container">
        <ul className="compare-list">
          {compareWishlistLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {compare?.map((item) => (
                <CompareItem key={item._id} product={item} />
              ))}
            </>
          )}
        </ul>
        {compareWishlistError && !compareWishlistLoading && (
          <EmptyOrErrorContainer error={compareWishlistError} />
        )}
        {!compareWishlistLoading && compare?.length === 0 && (
          <EmptyOrErrorContainer text="No products found. Add products to your compare list." />
        )}
      </div>
    </div>
  );
};

export default Compare;
