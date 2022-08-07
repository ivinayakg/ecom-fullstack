import { DeleteData, GetData, PostData } from "../API";

export const WishListReducer = (state, action) => {
  let { type, payload } = action;
  switch (type) {
    case "add":
      if (!state.find((entry) => entry._id === payload._id)) {
        AddToWishlistAPI(payload);
        return [...state, payload];
      }
      return state;
    case "remove":
      DeleteToWishlistAPI(payload);
      return state.filter((entry) => {
        return entry._id !== payload._id;
      });
    case "updateApi":
      return payload;
    default:
      return state;
  }
};

// these function are there to call the backend to update, add or delete the data for a user wishlist on the backend
const AddToWishlistAPI = async (product) => {
  try {
    const res = await PostData(
      "/user/wishlist",
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

const DeleteToWishlistAPI = async (product) => {
  try {
    const res = await DeleteData(`/user/wishlist/${product._id}`, {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
  } catch (error) {
    alert("Server Error Try Again Later");
  }
};

export const getDataWishlist = async (dispatch) => {
  try {
    const data = await GetData("/user/wishlist", {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
    dispatch({
      type: "updateApi",
      for: "wishlist",
      payload: data.wishlist,
    });
  } catch (error) {
    alert("Server Error");
    return;
  }
};
