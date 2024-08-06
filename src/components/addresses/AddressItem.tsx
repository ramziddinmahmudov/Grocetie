import { useState } from "react";
import AddAddressModal from "../modals/AddAddressModal";
import { AddressItemTypes } from "../../utils/user-types";

const AddressItem = ({
  selectAddressHandler,
  addressItem,
  select,
  selectedAddressId,
}: PropsTypes) => {
  const [addressModalShown, setAddressModalShown] = useState(() => false);

  const selectAddress = (e: React.MouseEvent<HTMLSpanElement>) => {
    selectAddressHandler((e.target as HTMLSpanElement).dataset.id!);
  };

  return (
    <>
      {addressModalShown && (
        <AddAddressModal
          text="Edit Address"
          closeModal={() => setAddressModalShown(false)}
          addressItem={addressItem}
        />
      )}

      <div className="address-book__item" key={addressItem._id}>
        <h5>{addressItem.name}</h5>
        <p>{`${addressItem.address1}, ${
          addressItem.address2 ? addressItem.address2 : ""
        }, ${addressItem.city}, ${addressItem.postalCode}, `}</p>
        <span>{addressItem.phoneNumber}</span>
        {/* It is for dashboard and settings pages */}
        {!select && (
          <h2
            className="address-book__edit"
            onClick={() => setAddressModalShown(true)}
            children="Edit Address"
          />
        )}

        {/* It is for checkout page with select option */}
        {select && (
          <span
            data-id={addressItem._id}
            onClick={selectAddress}
            className={`address-book__select ${
              selectedAddressId === addressItem._id && "selected"
            }`}
          />
        )}
      </div>
    </>
  );
};

interface PropsTypes {
  selectAddressHandler: (id: string) => void;
  select: boolean;
  selectedAddressId?: string;
  addressItem: AddressItemTypes;
}

// interface Combined extends PropsTypes, AddressItemTypes {}

export default AddressItem;
