import { useUserContext } from "../context & data/UserContext";
import "./css/SingleProductPage.css";
import { notificationHandler } from "./Notification";

const SingleProductPage = ({ data }) => {
  const { dispatch } = useUserContext();

  const addWishlist = () => {
    dispatch({ for: "wishlist", type: "add", payload: data });
  };

  const addToCart = () => {
    dispatch({ for: "cart", payload: data, type: "add" });
    notificationHandler({
      type: "success",
      content: "Succesfully Added to cart",
    });
  };

  return (
    <div className="productPage">
      <div className="productPage_img">
        <img src={data.image} alt="" />
      </div>
      <div className="productPage_content">
        <div className="productPage_detail">
          <h2 className="head2">{data.name}</h2>
          <h4 className="head4 text-fade">{data.brand}</h4>
          <div className="productPage_price mb1">
            <h2 className="head2">
              <span>Rs.</span> {data.price - (data.discount / 100) * data.price}
            </h2>
            <h2 className="head2 productPage_discount">
              <span>Rs.</span> {data.price}
            </h2>
          </div>
          <p className="text4">{data.description}</p>
        </div>
        <div className="productPage_Actions mt3">
          <div className="productPage_Actionsbtns">
            <button className="productPage_action1" onClick={addWishlist}>
              Add To Wishlist
            </button>
            <button className="productPage_action2" onClick={addToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
