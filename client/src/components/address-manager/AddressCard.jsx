export const AddressCard = ({ data, dispatch, setUpdate, currentUpdate }) => {
  const deleteHandler = () => {
    dispatch({ for: "address", type: "remove", payload: data });
  };
  const updateHandler = (id) => {
    setUpdate(id);
  };

  return (
    <div className="address_card">
      <div className="flex">
        <h4 className="address_cardHeading">{data.firstName}</h4>
        <h4 className="address_cardHeading">{data.lastName}</h4>
      </div>
      <h5 className="address_cardHeading">+91-{data.PhoneNo}</h5>
      <p className="address_cardPara">{data.streetAddress}</p>
      <div className="flex">
        <p className="address_cardPara">{data.city},</p>
        <p className="address_cardPara">{data.state}</p>
      </div>
      <p className="address_cardPara">{data.nearby}</p>
      <div className="btn-box">
        <button onClick={() => deleteHandler(data._id)}>Delete</button>
        <button
          onClick={() => updateHandler(data._id)}
          disabled={currentUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};
