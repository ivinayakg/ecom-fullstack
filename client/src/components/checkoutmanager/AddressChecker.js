import { Link } from "react-router-dom";
import "../css/checkoutManager.css";

const AddressChecker = ({ addresses, setData, current }) => {
  return (
    <>
      <div className="addressChecker">
        {addresses?.map((entry) => {
          return (
            <div
              className={`addressCheckerCard ${
                current === entry._id && "addressCheckerCard--active"
              }`}
              key={entry._id}
            >
              <div className="addressCheckerCard_content">
                <h2>{entry.firstName + " " + entry.lastName}</h2>
                <h2>{entry.PhoneNo}</h2>
                <p>{entry.streetAddress}</p>
                <p>{entry.city + " " + entry.state}</p>
                {entry.nearby && <p className="text-fade">{entry.nearby}</p>}
              </div>
              <button className="btn btn--pri" onClick={() => setData(entry)}>
                Select
              </button>
            </div>
          );
        })}
      </div>
      <Link className="addressChecker_link" to={"/profile"}>
        Add More Address?
      </Link>
    </>
  );
};

export default AddressChecker;
