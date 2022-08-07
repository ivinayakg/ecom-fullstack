import { useUserContext } from "../context & data/UserContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const { state, dispatch } = useUserContext();
  const wishlist = state.wishlist;

  const ProductClickHandler = (data) => {
    dispatch({ for: "wishlist", type: "remove", payload: data });
  };

  return (
    <div className="section wishlist">
      <div className="container">
        <h1>The Wishlist</h1>
        <div className="wishlistContainer">
          {wishlist.map((entry) => {
            return (
              <ProductCard
                data={{ ...entry, wishlist: true }}
                key={entry._id}
                clickHandler={() => ProductClickHandler(entry)}
                button={
                  <button
                    className="productListing_action"
                    onClick={() => ProductClickHandler(entry)}
                  >
                    Remove
                  </button>
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
