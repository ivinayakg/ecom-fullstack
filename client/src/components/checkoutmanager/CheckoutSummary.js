import "../css/checkoutManager.css";

const CheckoutSummary = ({ cart }) => {
  const totalCost = cart.reduce(
    (prev, curr) => parseInt(prev) + curr.price * curr.quantity,
    0
  );
  const totalDiscount = cart
    .reduce(
      (prev, curr) => prev + curr.price * (curr.discount / 100) * curr.quantity,
      0
    )
    .toFixed(0);
  const totalAmount = totalCost - totalDiscount;

  const PriceSummary = ({ data }) => {
    let discountPrice = parseInt(
      data.price - data.price * (data.discount / 100)
    ).toFixed(0);
    return (
      <>
        <td>Rs.{parseInt(data.price).toFixed(0)}</td>
        <td>Rs.{discountPrice}</td>
        <td>{data.quantity}</td>
        <td>Rs.{discountPrice * data.quantity}</td>
      </>
    );
  };

  return (
    <div className="checkoutSummary">
      <table className="checkoutSummary_table">
        <tbody>
          <tr>
            <th>S no.</th>
            <th>Item Name</th>

            <th>Price</th>
            <th>After Discount</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
          {cart?.map((entry, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{entry.name}</td>

                <PriceSummary data={entry} />
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="checkoutSummary_final">
        <h2>Total Amount {"(in Rs.)"}</h2>
        <h2>Rs. {totalAmount}</h2>
      </div>
    </div>
  );
};

export default CheckoutSummary;
