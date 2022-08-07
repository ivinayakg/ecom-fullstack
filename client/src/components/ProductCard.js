import { useUserContext } from "../context & data/UserContext";
import { useNavigate } from "react-router-dom";
import "./css/ProductCard.css";
import { notificationHandler } from "./Notification";

const ProductCard = ({ data, type, clickHandler, button }) => {
  const { dispatch, state } = useUserContext();
  const navigate = useNavigate();
  const inCart = state.cart.data.find((entry) => entry._id === data._id);

  const addToCart = () => {
    if (!inCart) {
      dispatch({ for: "cart", payload: data, type: "add" });
      if (clickHandler) clickHandler();
      notificationHandler({
        type: "success",
        content: "Succesfully Added to cart",
      });
    } else navigate("/cart");
  };

  const redirectToProductPage = () => {
    navigate(`/product/${data._id}`, { state: data });
  };

  return (
    <div className={`productListing`}>
      <div className="productListing_header">
        <img src={data.image} alt="Product" />

        <div
          className="productListing_wishlistIcon"
          onClick={() =>
            dispatch({ for: "wishlist", type: "add", payload: data })
          }
        >
          <i className={`${data.wishlist ? "fas" : "far"} fa-heart`}></i>
        </div>
      </div>
      <div className="productListing_content">
        <h5 className="productListing_title" onClick={redirectToProductPage}>
          {data.name}
        </h5>
        <div className="productListing_price">
          <h4>Rs .{data.price - (data.discount / 100) * data.price}</h4>
          {/* <h3>Rs .{data.price}</h3> */}
        </div>
      </div>
      <button
        className={`productListing_action ${data.wishlist && "forWishlist"}`}
        onClick={addToCart}
      >
        {!inCart
          ? data.wishlist
            ? "Move To Cart"
            : "Add To Cart"
          : "Go To Cart"}
      </button>
      {button && button}
    </div>
  );
};

export default ProductCard;
