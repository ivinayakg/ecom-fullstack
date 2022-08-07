import SingleProductPage from "../components/SingleProductPage";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetData } from "../API";

const SingleProduct = () => {
  const { state } = useLocation();
  const { productId } = useParams();
  const [data, setData] = useState(state);

  useEffect(() => {
    if (!state || state?._id !== productId) {
      GetData(`/products/${productId}`).then((data) => setData(data.product));
    }
  }, [productId, state]);

  return (
    <div className="section">
      <div className="container">
        {data && <SingleProductPage data={data} />}
      </div>
    </div>
  );
};

export default SingleProduct;
