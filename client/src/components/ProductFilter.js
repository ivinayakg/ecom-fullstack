import { useEffect, useMemo, useReducer } from "react";
import { useState } from "react";
import "./css/ProductFilter.css";

const ProductFilter = ({ setFilter, className, buttonFun, data }) => {
  //ready to get irritated as i got seeing my own code why wont you

  const [state, dispatch] = useReducer(FilterReducer, {
    sort: null,
    onlyInStock: false,
    onlyFastDelivery: false,
    priceRange: 0,
    brand: [],
    rating: 0,
  });
  const brands = data.brands;

  useEffect(() => {
    //pass up the latest filter configuration to its parent component
    setFilter(state);
  }, [state, setFilter]);

  return (
    <div className={`productFilter ${className ?? ""}`}>
      <div className="productFilter_heading">
        <h4>Filter</h4>
        <button
          className="productFilter_clear"
          onClick={() => {
            dispatch({ type: "reset" });
            if (buttonFun) buttonFun();
          }}
        >
          Clear
        </button>
      </div>
      <div className="productFilter_filter">
        <h4 className="productFilter_filterHeading">Price</h4>
        <input
          type="range"
          value={state.priceRange}
          id="priceRange"
          onChange={(e) =>
            dispatch({ type: "updatePrice", payload: e.target.value })
          }
        />
        <h4>Rs. {state.priceRange * 10}</h4>
      </div>

      <div className="productFilter_filter">
        <h4 className="productFilter_filterHeading">Sort By</h4>
        <div className="productListing_options">
          <label>
            High To Low
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "sort", payload: "highToLow" })}
              checked={state.sort === "highToLow"}
            />
          </label>
          <label>
            Low To High
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "sort", payload: "lowToHigh" })}
              checked={state.sort === "lowToHigh"}
            />
          </label>
          <label>
            None
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "sort", payload: null })}
              checked={state.sort === null}
            />
          </label>
        </div>
      </div>

      <div className="productFilter_filter">
        <h4 className="productFilter_filterHeading">Filter By Brand</h4>
        <div className="productListing_options">
          {brands.map((entry, index) => {
            return (
              <label key={index}>
                {entry}
                <input
                  type="checkbox"
                  onChange={() => dispatch({ type: "brand", payload: entry })}
                  checked={state.brand.includes(entry)}
                />
              </label>
            );
          })}{" "}
          <label>
            None
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "brand", payload: "None" })}
              checked={state.brand.includes("None")}
            />
          </label>
        </div>
      </div>
      <div className="productFilter_filter">
        <h4 className="productFilter_filterHeading">Filter By Rating</h4>
        <div className="productListing_options">
          {[1, 2, 3, 4].map((entry, index) => {
            return (
              <label key={index}>
                {entry}+ Star
                <input
                  type="checkbox"
                  onChange={() => dispatch({ type: "rating", payload: entry })}
                  checked={state.rating === entry}
                />
              </label>
            );
          })}{" "}
          <label>
            None
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "rating", payload: 0 })}
              checked={state.brand === 0}
            />
          </label>
        </div>
      </div>

      <div className="productFilter_filter">
        <h4 className="productFilter_filterHeading">Filter Further</h4>
        <div className="productListing_options">
          <label>
            Only Fast Delivery
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "deliveryToggle" })}
              checked={state.onlyFastDelivery}
            />
          </label>
          <label>
            In Stock
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "stockToggle" })}
              checked={state.onlyInStock}
            />
          </label>
          <label>
            None
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "resetstockndelivery" })}
              checked={!state.onlyFastDelivery && !state.onlyInStock}
            />
          </label>
        </div>
      </div>

      {/* helo */}
    </div>
  );
};

const ProductFilterResponsive = (Component) => {
  /*
  this is what we call a higher order component (HOC) basically its wrapping
  the componenet which im passign it into a another component which will extend its functionality
  */

  //please ignore this as this is not finished yet just think of it as a function which is going to return the component
  // as it is which is being passed down to it
  const OutputComponent = (props) => {
    const [mobile, setMobile] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
      if (window.screen.width <= 768) setMobile(true);
      else setMobile(false);
    }, [window.screen.width]);

    return mobile ? (
      <>
        <div className="Filterresponsive">
          {show && (
            <Component {...props} className="productFilter--responsive" />
          )}
          <button className="btn" onClick={() => setShow((prev) => !prev)}>
            Filter
          </button>
        </div>
      </>
    ) : (
      <Component {...props} />
    );
  };

  return OutputComponent;
};

export const useCustomFilter = (data, state) => {
  //using this useMemo hook im adding a very particular functionality
  //basically the function within will be called once and the value will be returned
  // and will not be called again until and unless the value of the variable in the second arguement changes
  //that way it will save heavy computation energy
  //again something that i wanted to try you can just think of it as a simple function returning a array.
  const sortedArray = useMemo(
    () =>
      [...data].sort((first, second) =>
        state.sort !== null
          ? state.sort === "highToLow"
            ? second.price - first.price
            : first.price - second.price
          : 1
      ),
    [state.sort, data]
  );

  const filteredArray = sortedArray
    .filter((entry) => (state.onlyInStock ? entry.inStock : true))
    .filter((entry) => (state.onlyFastDelivery ? entry.fastDelivery : true));
  const rangeFiltered = filteredArray.filter(
    (entry) => entry.price > state.priceRange * 10
  );
  const brandFilter = rangeFiltered.filter((entry) =>
    state.brand.length > 0 && !state.brand.includes("None")
      ? state.brand.includes(entry.brand)
      : true
  );

  const ratingFilter = brandFilter.filter(
    (entry) => entry.ratings >= (state.rating ?? 0)
  );

  return ratingFilter;
};

const FilterReducer = (state, action) => {
  switch (action.type) {
    case "sort":
      return { ...state, sort: action.payload };
    case "deliveryToggle":
      return { ...state, onlyFastDelivery: !state.onlyFastDelivery };
    case "stockToggle":
      return { ...state, onlyInStock: !state.onlyInStock };
    case "updatePrice":
      return { ...state, priceRange: action.payload };
    case "resetstockndelivery":
      return { ...state, onlyInStock: false, onlyFastDelivery: false };
    case "rating":
      return { ...state, rating: action.payload };
    case "brand":
      if (action.payload === "None" && !state.brand.includes(action.payload)) {
        return { ...state, brand: ["None"] };
      } else if (state.brand.includes(action.payload)) {
        let brands = state.brand.filter(
          (entry) => entry !== action.payload && entry !== "None"
        );
        return { ...state, brand: brands };
      } else {
        let brands = [...state.brand, action.payload];
        return { ...state, brand: brands };
      }
    case "reset":
      return {
        sort: null,
        onlyInStock: false,
        onlyFastDelivery: false,
        priceRange: 0,
        brand: ["None"],
        rating: 0,
      };
    default:
      return state;
  }
};

export default ProductFilterResponsive(ProductFilter);
