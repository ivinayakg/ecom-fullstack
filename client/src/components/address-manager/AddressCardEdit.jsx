import { useState } from "react";

export const AddressCardEdit = ({ data, dispatch, setUpdate }) => {
  const [formData, setFormData] = useState(data);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ for: "address", type: "update", payload: formData });
    setUpdate("");
  };

  return (
    <form onSubmit={submitHandler} className="address_card">
      <div className="flex">
        <input
          className="address_cardHeading"
          value={formData.firstName}
          type="text"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          placeholder="First Name"
        />
        <input
          className="address_cardHeading"
          value={formData.lastName}
          type="text"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          placeholder="Last Name"
        />
      </div>
      <input
        className="address_cardHeading"
        value={formData.PhoneNo}
        type="number"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, PhoneNo: e.target.value }))
        }
        placeholder="Phone No"
      />
      <textarea
        className="address_cardPara"
        value={formData.streetAddress}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, streetAddress: e.target.value }))
        }
        placeholder="Street Address"
      />
      <div className="flex">
        <input
          className="address_cardPara"
          value={formData.city}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, city: e.target.value }))
          }
          placeholder="City"
        />
        <input
          className="address_cardPara"
          value={formData.state}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, state: e.target.value }))
          }
          placeholder="State"
        />
      </div>
      <input
        type="text"
        value={formData.nearby}
        className="address_cardPara"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, nearby: e.target.value }))
        }
        placeholder="Nearby (optional)"
      />
      <div className="btn-box">
        <button type="button" onClick={() => setUpdate("")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </div>
    </form>
  );
};
