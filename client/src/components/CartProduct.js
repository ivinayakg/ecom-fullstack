import { useUserContext } from "../context & data/UserContext";
import { useNavigate } from "react-router-dom";
import "./css/CartProduct.css";

const CartProduct = ({ data }) => {
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  const redirectToProductPage = () => {
    navigate(`/product/${data._id}`, { state: data });
  };

  return (
    <div class="cartProduct ">
      <div class="cartProduct_img" onClick={redirectToProductPage}>
        <img src={data.image} alt="" />
      </div>
      <div class="cartProduct_heading">
        <h5 class="cartProductProduct_title" onClick={redirectToProductPage}>
          {data.name}
        </h5>
        <div class="cartProduct_price">
          <h2 class="t3">
            Rs. {data.price - data.price * (data.discount / 100)}
          </h2>
          <h3 class="t3 text-cross text-fade">Rs. {data.price}</h3>
        </div>
        <p class="cartProduct_discount t3 text-fade">
          {data.discount}% Discount
        </p>
        <div class="product_Qauntity">
          <div class="text4">Quantity :-</div>
          <i
            class="fas fa-plus-square"
            onClick={() =>
              dispatch({
                for: "cart",
                payload: { _id: data._id, sign: "+" },
                type: "update",
              })
            }
          ></i>
          <div class="product_qauntityValue">{data.quantity}</div>
          <i
            class="fas fa-minus-square"
            onClick={() =>
              dispatch({
                for: "cart",
                payload: { _id: data._id, sign: "-" },
                type: "update",
              })
            }
          ></i>
        </div>
        <button
          onClick={() =>
            dispatch({ for: "cart", type: "remove", payload: data._id })
          }
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
