import AddressItem from "./AddressItem";
import { AddressItemTypes } from "../../utils/user-types";

const AddressList = ({
  select,
  filledButton,
  onOpenAddressModal,
  headerTwo,
  addresses,
  setSelectedAddressId,
  selectedAddressId,
}: AddressListTypes) => {
  const selectAddress = (value: string) => {
    setSelectedAddressId && setSelectedAddressId(value);
  };

  return (
    <div className="address-book">
      <div className={`address-book__header${headerTwo ? "-2" : ""}`}>
        Shipping Addresses
      </div>

      {addresses?.length !== 0 && (
        <div className="address-book__items">
          {addresses.map((item: AddressItemTypes) => (
            <AddressItem
              key={item._id}
              addressItem={item}
              select={select}
              selectedAddressId={selectedAddressId}
              selectAddressHandler={selectAddress}
            />
          ))}
        </div>
      )}

      {addresses.length === 0 && (
        <div className="address-book__items no-address-box">
          <p className="no-addresses">No addresses yet</p>
        </div>
      )}

      <div className="address-book__bottom">
        {filledButton ? (
          <button
            className="button button-md"
            onClick={onOpenAddressModal}
            children="Add New Address"
          />
        ) : (
          <span onClick={onOpenAddressModal}>Add New Address</span>
        )}
      </div>
    </div>
  );
};

interface AddressListTypes {
  select: boolean;
  filledButton: boolean;
  onOpenAddressModal?: () => void;
  headerTwo?: boolean;
  addresses: AddressItemTypes[] | [];
  setSelectedAddressId?: (arg: string) => void;
  selectedAddressId?: string;
}

export default AddressList;
