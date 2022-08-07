import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

export const AddAddressForm = ({ setAddAddress, dispatch }) => {
  const [phoneNo, setPhoneNo] = useState("");

  const phoneNoHanlder = (e) => {
    if (e.target.value.length <= 10) setPhoneNo(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = {};
    for (let x of formData) {
      data[x[0]] = x[1];
    }
    data["_id"] = uuidV4();

    dispatch({ for: "address", type: "add", payload: data });
    setAddAddress(false);
  };

  return (
    <form className="address_form" onSubmit={submitHandler}>
      <div className="form_box">
        <input required type="text" name="firstName" placeholder="First Name" />
        <input required type="text" name="lastName" placeholder="Last Name" />
      </div>
      <input
        required
        type="number"
        name="PhoneNo"
        value={phoneNo}
        onChange={phoneNoHanlder}
        placeholder="Phone No."
      />
      <textarea
        id=""
        placeholder="Street Address"
        required
        name="streetAddress"
        rows="2"
      />
      <div className="form_box">
        <input required type="text" name="city" placeholder="City" />
        <input required type="text" name="state" placeholder="State" />
      </div>
      <input
        type="text"
        name="nearby"
        required={false}
        placeholder="Nearby (optional)"
      />
      <div className="form_box">
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setAddAddress(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};
