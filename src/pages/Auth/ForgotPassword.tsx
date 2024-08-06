import TextInput from "../../components/UI/Inputs/TextInput";
import { FormEvent, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/auth";
import LoadingButtonSpinner from "../../components/UI/Icons/LoadingButtonSpinner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const forgotPassSuccess = JSON.parse(
    localStorage.getItem("forgotPassSuccess")!
  );

  const onForgotPasswordHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    setLoading(true);
    await forgotPassword(email, location);
    setLoading(false);
  };

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          {!forgotPassSuccess && (
            <>
              <h6>Enter your email</h6>
              <form className="form" onSubmit={onForgotPasswordHandler}>
                <TextInput
                  text="Your email"
                  placeholder="laurawilson@example.com"
                  type="email"
                  ref={emailRef}
                />
                <button
                  className="button form__button"
                  children={loading ? <LoadingButtonSpinner /> : "Enter"}
                  disabled={loading && true}
                />
              </form>
            </>
          )}

          {forgotPassSuccess && (
            <div className="forgotPassword-success">
              <h6>Reset your password</h6>
              <p>
                Check your email for a link to reset your password. If it
                doesn't appear within a few minutes, check your spam folder.
              </p>
              <button
                className="button form__button"
                children="Return to sign in"
                onClick={() => navigate("/auth/signin")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
