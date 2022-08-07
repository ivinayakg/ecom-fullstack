import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  preloadedState: {
    cart: {
      data: [],
      totalQauntity: 0,
    },
    wishlist: [],
    userData: {
      isAuth: false,
      token: "",
      address: [],
    },
    addresses: [],
  },
});
