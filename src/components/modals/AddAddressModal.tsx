import ReactDOM from "react-dom";
import ModalActions from "./ModalActions";
import { useContext, useEffect, useRef, useState } from "react";
import TextInput from "../UI/Inputs/TextInput";
import { AddressItemTypes, User } from "../../utils/user-types";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { CountryCode } from "libphonenumber-js";
import { UserContext } from "../../store/UserContext";
import { addDeleteUpdateAddress, getCountryCode } from "../../api/user";
import { ActionTypeProps } from "../../utils/types";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddAddressOverlay = ({
  addressItem,
  text,
  closeModal,
}: AddAddressModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    addressItem?.phoneNumber!
  );
  const [countryCode, setCountryCode] = useState<CountryCode>();
  const nameRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const address1Ref = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useContext(UserContext);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchCountry = async () => await getCountryCode(setCountryCode);
    state.user?.phoneNumber === undefined && fetchCountry();
  }, [state.user?.phoneNumber]);

  const onUpdateOrDeleteOrAddAddress = async (actionType: ActionTypeProps) => {
    const addressRefs = {
      nameRef,
      cityRef,
      address1Ref,
      address2Ref,
      postalCodeRef,
      phoneNumber: phoneNumber as string,
      countryCode: countryCode as CountryCode,
    };

    await addDeleteUpdateAddress(
      dispatch,
      axiosPrivate,
      actionType,
      state.user as User,
      addressRefs,
      addressItem as AddressItemTypes,
      closeModal
    );
  };

  return (
    <div className="address-form">
      <div className="address-form__header">{text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput
            label="Your name*"
            placeholder="Your name"
            defaultValue={addressItem?.name || ""}
            ref={nameRef}
          />

          {/* Third-party phone number input (npm package) */}
          <div className="input">
            <label htmlFor="Receiver phone number">
              Receiver phone number*
            </label>

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
        </div>
        <div className="form-inputs">
          <TextInput
            label="Your city*"
            placeholder="Your city"
            defaultValue={addressItem?.city || ""}
            ref={cityRef}
          />
          <TextInput
            label="Postal code*"
            placeholder="Postal code"
            defaultValue={JSON.stringify(addressItem?.postalCode)}
            ref={postalCodeRef}
          />
        </div>
        <div className="form-inputs">
          <TextInput
            label="Address*"
            placeholder="Receiver address"
            defaultValue={addressItem?.address1 || ""}
            ref={address1Ref}
          />
        </div>
        <div className="form-inputs">
          <TextInput
            span={<span>(Optional)</span>}
            label="Additional address"
            placeholder="Additional address"
            defaultValue={addressItem?.address2 || ""}
            ref={address2Ref}
          />
        </div>
      </div>
      <ModalActions
        closeModal={closeModal}
        text={text}
        onAddHandler={onUpdateOrDeleteOrAddAddress.bind(null, "add")}
        onUpdateHandler={onUpdateOrDeleteOrAddAddress.bind(null, "update")}
        onDeleteHandler={onUpdateOrDeleteOrAddAddress.bind(null, "delete")}
        loading={state.updateMeLoading}
      />
    </div>
  );
};

const AddAddressModal = (props: AddAddressModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddAddressOverlay
          text={props.text}
          closeModal={props.closeModal}
          addressItem={props.addressItem}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface AddAddressModalProps {
  text: string;
  closeModal: () => void;
  addressItem?: AddressItemTypes;
}

export default AddAddressModal;
