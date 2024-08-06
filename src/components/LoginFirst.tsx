import { Link, useLocation } from "react-router-dom";
const LoginFirst = () => {
  const location = useLocation();

  return (
    <div className="login-first">
      <div className="login-first__content">
        <h2>Please sign in or signup to gain access to this page.</h2>

        <div className="header__cart--not-logged">
          <Link
            to={`/auth/signin${"?next-page=" + location.pathname.slice(1)}`}
            className="login-btn"
          >
            Sign in
          </Link>
          <span> / </span>
          <Link
            to={`/auth/signup${"?next-page=" + location.pathname.slice(1)}`}
            className="login-btn"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginFirst;
