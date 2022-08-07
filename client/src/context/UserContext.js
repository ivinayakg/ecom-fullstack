import { createContext, useContext, useEffect, useReducer } from "react";
import { notificationHandler } from "../components/Notification";
import { addressReducer } from "./AddressReducer";
import { CartReducer, getDataCart } from "./CartReducer";
import { getDataWishlist, WishListReducer } from "./WishListReduce";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, {
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
  });

  useEffect(() => {
    dispatch({ for: "userData", type: "update" });
  }, []);

  useEffect(() => {
    UpdateData(state.userData.token, dispatch);
  }, [state.userData.isAuth]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const UpdateData = (token, dispatch) => {
  if (token.length > 25) {
    getDataCart(dispatch);
    getDataWishlist(dispatch);
  } else dispatch({ for: "cart", type: "local" });
};

export const useUserContext = () => useContext(UserContext);

const GlobalReducer = (state, action) => {
  switch (action.for) {
    case "address":
      return {
        ...state,
        userData: {
          ...state.userData,
          address: addressReducer(state.userData.address, action),
        },
      };

    case "cart":
      const cartData = CartReducer(state.cart, action);
      if (!state.userData.isAuth || state.userData.isAuth === "false") {
        if (state.cart.data.length >= 0) {
          localStorage.setItem("cartData", JSON.stringify(cartData.data));
        }
      }
      return {
        ...state,
        cart: cartData,
      };
    case "wishlist":
      if (
        !localStorage.getItem("isAuth") ||
        localStorage.getItem("isAuth") === "false" ||
        localStorage.getItem("token").length < 25
      ) {
        notificationHandler({ type: "warning", content: "Login First..." });
        return state;
      }
      let data = WishListReducer(state.wishlist, action);
      return {
        ...state,
        wishlist: data,
      };
    case "userData":
      switch (action.type) {
        case "update":
          return {
            ...state,
            userData: {
              ...state.userData,
              isAuth:
                localStorage.getItem("isAuth") &&
                localStorage.getItem("isAuth") !== "false" &&
                localStorage.getItem("token").length > 25
                  ? true
                  : false,
              token: localStorage.getItem("token") ?? "",
            },
          };
        case "reset":
          return {
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
          };
        default:
          return state;
      }

    default:
      return state;
  }
};
