import { useState } from "react";
import { AddressCard } from "./AddressCard";
import { AddressCardEdit } from "./AddressCardEdit";
import { AddAddressForm } from "./AddAddressForm";
import "../css/addressManager.css";
import { useUserContext } from "../../context & data/UserContext";

export const AddressManagement = () => {
  const { state, dispatch } = useUserContext();

  const [addAddress, setAddAddress] = useState(false);
  const [updateAddress, setUpdateAddress] = useState("");

  return (
    <div className="address_book">
      <h2>Your Addresses</h2>
      {addAddress ? (
        <AddAddressForm setAddAddress={setAddAddress} dispatch={dispatch} />
      ) : (
        <button onClick={() => setAddAddress(true)}>Add A Address</button>
      )}
      <div className="address_wrapper">
        {state.userData.address?.map((entry) => {
          return updateAddress === entry._id ? (
            <AddressCardEdit
              key={entry._id}
              dispatch={dispatch}
              data={entry}
              setUpdate={setUpdateAddress}
            />
          ) : (
            <AddressCard
              key={entry._id}
              data={entry}
              setUpdate={setUpdateAddress}
              dispatch={dispatch}
              currentUpdate={updateAddress !== ""}
            />
          );
        })}
      </div>
    </div>
  );
};
