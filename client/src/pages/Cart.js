import { useUserContext } from "../context & data/UserContext";
import CartProduct from "../components/CartProduct";
import CartTotal from "../components/CartTotal";

const CartPage = () => {
  const { state } = useUserContext();

  const totalCost = state.cart.data.reduce(
    (prev, curr) => parseInt(prev) + curr.price * curr.quantity,
    0
  );
  const totalDiscount = state.cart.data
    .reduce(
      (prev, curr) => prev + curr.price * (curr.discount / 100) * curr.quantity,
      0
    )
    .toFixed(0);
  const totalAmount = totalCost - totalDiscount;

  return (
    <div className="section cartPage">
      <div className="container">
        <h2>Cart</h2>
        <div className="cartContainer">
          <div className="cartProductsContainer">
            {state.cart.data.map((entry) => {
              return <CartProduct data={entry} key={entry._id} />;
            })}
          </div>
          <CartTotal
            amount={totalAmount}
            discount={totalDiscount}
            total={totalCost}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
