import { useContext, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { sendCodeAgain, verify } from "../../api/auth";
import { UserContext } from "../../store/UserContext";

const Verification = () => {
  const [code, setCode] = useState<string>("");
  const [sendVLoading, setSendVLoading] = useState<boolean>(false);
  const handleChange = (code: string) => setCode(code);
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);

  const onVerifyHandler = async () => {
    await verify(dispatch, code, location, navigate);
  };

  const onSendCodeAgainHandler = async () => {
    setSendVLoading(true);
    await sendCodeAgain(setCode, location);
    setSendVLoading(false);
  };

  return (
    <div className="section-xl">
      <div className="container">
        <div className="form-wrapper">
          <h6>Verify me</h6>
          <div className="form form-verification-box">
            <h6>Enter code sent to your email to get access</h6>
            <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={6}
              renderSeparator={<span style={{ width: "8px" }} />}
              shouldAutoFocus={true}
              containerStyle="form-verification"
              renderInput={(props) => <input {...props} />}
            />
            <div className="form__buttons">
              <button
                className="button form__button"
                disabled={(state.verifyLoading || sendVLoading) && true}
                onClick={onSendCodeAgainHandler}
              >
                Send again
              </button>
              <button
                className="button form__button"
                disabled={(state.verifyLoading || code?.length < 6) && true}
                onClick={onVerifyHandler}
              >
                Verify me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
