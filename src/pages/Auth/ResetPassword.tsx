import { UserContext } from "../../store/UserContext";
import { FormEvent, useContext, useEffect, useRef } from "react";
import PasswordInput from "../../components/UI/Inputs/PasswordInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkResetTokenExistApi, resetPassword } from "../../api/auth";
import LoadingButtonSpinner from "../../components/UI/Icons/LoadingButtonSpinner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const { resetToken } = useParams();
  const { state, dispatch } = useContext(UserContext);

  // Check if token is valid or has not yet expired. If either of them happens, the user will be redirected to the "forgot-password" page.
  useEffect(() => {
    (async () => {
      await checkResetTokenExistApi(resetToken, location, navigate);
    })();
  }, [resetToken, navigate, location]);

  const onResetPasswordHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;
    const passwords = { password, passwordConfirm };
    await resetPassword(dispatch, passwords, resetToken, location, navigate);
  };

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Reset Password</h6>
          <form className="form" onSubmit={onResetPasswordHandler}>
            <PasswordInput
              label="Password"
              placeholder="Password"
              ref={passwordRef}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm Password"
              ref={passwordConfirmRef}
            />
            <button
              className="button form__button"
              disabled={state.resetLoading && true}
              children={
                state.resetLoading ? <LoadingButtonSpinner /> : "Reset Password"
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
