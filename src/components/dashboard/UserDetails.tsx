import { useState } from "react";
import AddressList from "../addresses/AddressList";
import AddAddressModal from "../modals/AddAddressModal";
import { User } from "../../utils/user-types";
import UserDetailsMain from "./UserDetailsMain";

const UserDetails = ({ user }: { user: User }) => {
  const [addressModalShown, setAddressModalShown] = useState(() => false);

  return (
    <>
      {addressModalShown && (
        <AddAddressModal
          text="Add New Address"
          closeModal={() => setAddressModalShown(false)}
        />
      )}
      <div className="user__details">
        <UserDetailsMain
          edit
          photo={user.photo}
          name={user.name}
          username={user.username}
          phoneNumber={user.phoneNumber}
          email={user.email}
        />
        <AddressList
          select={false}
          onOpenAddressModal={() => setAddressModalShown(true)}
          filledButton={false}
          addresses={user.addresses}
        />
      </div>
    </>
  );
};

export default UserDetails;
