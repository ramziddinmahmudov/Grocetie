import TextInput from "../UI/Inputs/TextInput";
import { User } from "../../utils/user-types";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { CountryCode } from "libphonenumber-js";
import { getCountryCode, updateMe } from "../../api/user";
import { UserContext } from "../../store/UserContext";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const AccountSettings = ({ user }: { user: User | null }) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    user?.phoneNumber || ""
  );
  const [countryCode, setCountryCode] = useState<CountryCode>();
  const nameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string>();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = URL.createObjectURL((e.target as HTMLInputElement).files![0]);
    setUploadedImage(image);
  };

  const { state, dispatch } = useContext(UserContext);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchCountry = async () => await getCountryCode(setCountryCode);
    user?.phoneNumber === undefined && fetchCountry();
  }, [user?.phoneNumber]);

  const onUpdateMeHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const username = userNameRef.current?.value;
    const email = emailRef.current?.value;

    const userData = {
      phoneNumber,
      name,
      username,
      email,
      photoRef,
      countryCode,
    };
    await updateMe(dispatch, axiosPrivate, userData);
  };

  return (
    <div className="account-settings">
      <div className="address-book__header-2">Account Settings</div>
      <div className="account-settings__form">
        <form className="account-settings__inputs" onSubmit={onUpdateMeHandler}>
          <TextInput
            label="Name"
            placeholder={""}
            defaultValue={user?.name}
            ref={nameRef}
          />
          <TextInput
            label="Username"
            defaultValue={user?.username}
            placeholder={""}
            ref={userNameRef}
          />
          <TextInput
            label="Email"
            defaultValue={user?.email}
            type="email"
            placeholder={""}
            ref={emailRef}
          />
          {/* Third-party phone number input (npm package) */}
          <div className="input">
            <label htmlFor="Receiver phone number">Receiver phone number</label>
            <PhoneInput
              placeholder="Receiver phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              onCountryChange={setCountryCode}
              defaultCountry={countryCode || "KR"}
              international
              countryCallingCodeEditable={false}
            />
          </div>

          <button
            className="button button-md"
            disabled={state.updateMeLoading && true}
          >
            Save Changes
          </button>
        </form>
        <div className="account-settings__photo">
          <img src={uploadedImage ? uploadedImage : user?.photo} alt="" />
          <label htmlFor="photo" className="button button__outline">
            Change Image
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            ref={photoRef}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
