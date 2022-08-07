import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context & data/UserContext";
import "./css/CartTotal.css";

const CartTotal = ({ total, discount, amount }) => {
  const navigate = useNavigate();
  const { state } = useUserContext();

  const clickHandler = () => {
    if (!state.userData.isAuth || state.userData.token.length < 25) {
      navigate("/login");
    } else navigate("/checkout");
  };

  return (
    <div className="cart_total">
      <div className="cart_totalHeading">
        <h3 className="head3">Price Summary -</h3>
      </div>
      <div className="cart_totalDetails">
        <div className="cart_priceDetail">
          <p className="text4">Price</p>
          <p className="text4">Rs. {total}</p>
        </div>
        <div className="cart_priceDetail">
          <p className="text4">Dicount</p>
          <p className="text4">Rs. {discount}</p>
        </div>
        {/* <div className="cart_priceDetail">
          <p className="text4">Delivery Charges</p>
          <p className="text4">Rs. 500</p>
        </div> */}
      </div>
      {total > 0 ? (
        <>
          <div className="cart_totalAmount">
            <h3 className="head3">Total Amount</h3>
            <h4 className="head4">Rs. {amount}</h4>
          </div>
          <div className="cart_totalAction">
            <p>You have made a total saving of Rs. {discount}</p>
            <button className="btn-sec" onClick={clickHandler}>
              Place Order
            </button>
          </div>
        </>
      ) : (
        <h3 className="head3">Your Cart Is Empty</h3>
      )}
    </div>
  );
};

export default CartTotal;
