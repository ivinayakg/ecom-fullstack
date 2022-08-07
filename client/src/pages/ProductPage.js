import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetData } from "../API";
import ProductCard from "../components/ProductCard";
import ProductFilter, { useCustomFilter } from "../components/ProductFilter";
import { useUserContext } from "../context & data/UserContext";

const ProductPage = () => {
  // to get the params from the url
  const { filterName, catergoryName } = useParams();
  const navigate = useNavigate();

  //basic products that we got
  const [productsData, setProductsData] = useState([]);
  const { state } = useUserContext();

  // this is the setup to use filter (bear with me , this one is nice as AF)
  // the ProductFilter componenet gets the setfilter as a prop as it handles the filter data, whenever the state of filter in
  // the ProductFilter componenet changes it run this function and pass down the latest filter configuration.
  //later this below filter state calls the custom hook for filtering with the present products set and returns a filtered
  //array of products according to the filter configuration
  const [filter, setFilter] = useState({});
  const data = useCustomFilter(productsData, filter);

  // this is going to check if the wishlist array in the context has the product that we got and if do then give them one more
  // entry called wishlist and pass true
  let wishlistData = data.map((entry) => {
    if (state.wishlist?.find((wish) => wish._id === entry._id))
      return { ...entry, wishlist: true };
    else return entry;
  });

  //filter data by a name by taking the para and checking every listing if any of them name's contain the filterName
  let filteredData = wishlistData.filter((entry) => {
    return filterName !== "none" && filterName
      ? entry.name.toLowerCase().includes(filterName)
      : true;
  });

  //to get all the products from the backend API
  useEffect(() => {
    GetData("/products").then((data) => setProductsData(data.products));
  }, []);

  //to see if the url has any catergory filter
  useEffect(() => {
    if (catergoryName) {
      setFilter((prev) => ({ ...prev, brand: [catergoryName] }));
    }
  }, [catergoryName]);

  // these are props passed down to th ProductFilter componenet
  const productFilterProps = {
    setFilter: setFilter,
    buttonFun: () => navigate("/shop/filterby=none"),
    // this code below is to sedn the brands that the products data which is fetched has
    data: {
      brands: productsData.reduce(
        (prev, curr) =>
          prev.includes(curr.brand) ? prev : [...prev, curr.brand],
        []
      ),
    },
  };

  return (
    <div className="section productsPage">
      <div className="container">
        <ProductFilter {...productFilterProps} />
        <div className="productsContainer gap">
          {filteredData.map((entry) => {
            return <ProductCard key={entry._id} data={entry} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
