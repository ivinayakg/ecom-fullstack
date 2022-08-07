import { DeleteData } from "../API";
import { GetData, PostData } from "../API";

export const CartReducer = (cartState, action) => {
  let { type, payload } = action;

  switch (type) {
    case "add":
      let data = addToCart(payload, cartState.data);
      const addedData = data.find((entry) => entry._id === payload._id);
      if (addedData.quantity > 1) {
        UpdateToCartAPI(payload._id, "increment");
      } else {
        AddToCartAPI(addedData);
      }
      return {
        ...cartState,
        data,
        totalQauntity: data.reduce((prev, curr) => prev + curr.quantity, 0),
      };
    case "remove":
      let data1 = deleteFromCart(payload, cartState.data);
      DeleteToCartAPI(payload);
      return {
        ...cartState,
        data: data1,
        totalQauntity: data1.reduce((prev, curr) => prev + curr.quantity, 0),
      };
    case "update":
      const data2 = updateQuantity(payload._id, payload.sign, cartState.data);
      UpdateToCartAPI(
        payload._id,
        payload.sign === "+" ? "increment" : "decrement"
      );
      return {
        ...cartState,
        data: data2,
        totalQauntity: data2.reduce((prev, curr) => prev + curr.quantity, 0),
      };
    case "local":
      const data3 = JSON.parse(localStorage.getItem("cartData")) ?? [];

      return {
        ...cartState,
        data: data3,
        totalQauntity: data3.reduce((prev, curr) => prev + curr.quantity, 0),
      };
    case "updateAPI":
      return payload;
    default:
      return cartState;
  }
};

const addToCart = (data, state) => {
  let firstTime = true;
  let prodcs = state.map((entry) => {
    if (entry._id === data._id) {
      firstTime = false;
      return { ...entry, quantity: entry.quantity + 1 };
    } else return entry;
  });

  if (firstTime) prodcs.push({ ...data, quantity: 1 });

  return prodcs;
};

const deleteFromCart = (id, state) => state.filter((entry) => entry._id !== id);

const updateQuantity = (id, sign, state) => {
  return state.map((entry) => {
    if (entry._id === id) {
      let newData = {
        ...entry,
        quantity: sign === "+" ? entry.quantity + 1 : entry.quantity - 1,
      };
      return newData.quantity <= 0 ? { ...newData, quantity: 1 } : newData;
    } else return entry;
  });
};

// these function are there to call the backend to update, add or delete the data for a user cart on the backend
const AddToCartAPI = async (product) => {
  try {
    const res = await PostData(
      "/user/cart",
      { product },
      {
        headers: {
          authorization: localStorage.getItem("token") ?? "",
        },
      }
    );
  } catch (error) {
    alert("Server Error Try Again Later");
  }
};

const DeleteToCartAPI = async (product) => {
  try {
    const res = await DeleteData(`/user/cart/${product._id}`, {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
  } catch (error) {
    alert("Server Error Try Again Later");
  }
};

const UpdateToCartAPI = async (productId, type) => {
  try {
    const res = await PostData(
      `/user/cart/${productId}`,
      {
        action: { type },
      },
      {
        headers: {
          authorization: localStorage.getItem("token") ?? "",
        },
      }
    );
  } catch (error) {
    alert("Server Error Try Again Later");
  }
};

// this function is called to update the data of cart from the backend data
export const getDataCart = async (dispatch) => {
  try {
    const localData = JSON.parse(localStorage.getItem("cartData"));
    /*When the user logged in for the firstTime and have already products in the cart before logged in.
    its almost like syncing the local storage with backend. */
    if (localData && localData.length >= 1) {
      localData.forEach((entry) => {
        AddToCartAPI(entry);
      });
      localStorage.removeItem("cartData");
    }
    const data = await GetData("/user/cart", {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });

    dispatch({
      type: "updateApi",
      for: "cart",
      payload: data.cart,
    });
  } catch (error) {
    alert("Server Error");
    return;
  }
};
