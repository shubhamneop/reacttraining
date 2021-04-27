import * as actionTypes from "./actionTypes";
const demo = (
  state = {
    cart: [],
    total: 0,
    stage: 1,
    user_order: [],
    allCakes: [],
    serchCakes: [],
    cakeData: null,
    placeOrder: false,
    addToCart: false,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.INIT_USER: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.INIT_USER_SUCCESS: {
      state = { ...state };
      state["isLogin"] = true;
      state["isFetching"] = false;
      state["user"] = action.payload;
      return state;
    }
    case actionTypes.INIT_USER_FAIL: {
      state = { ...state };
      state["isLogin"] = false;
      state["isFetching"] = false;

      return state;
    }
    case actionTypes.LOGIN: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.LOGIN_SUCCESS: {
      state = { ...state };
      state["isLogin"] = true;
      state["user"] = action.payload;
      localStorage.token = action.payload.token;
      state["isFetching"] = false;
      state["isLoginError"] = false;

      return state;
    }
    case actionTypes.LOGIN_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      state["isLoginError"] = true;

      return state;
    }
    case actionTypes.LOGOUT: {
      state = { ...state };
      state["isLogin"] = false;
      state["user"] = {};
      state["cart"] = [];
      state["total"] = 0;
      state["serchCakes"] = [];
      state["user_order"] = [];
      state["cakeData"] = null;
      state["address"] = {};
      state["placeOrder"] = false;
      return state;
    }
    case actionTypes.ADD_CART: {
      state = { ...state };
      state["cart"] = [...state.cart, action.payload];
      state["total"] = state.total + action.payload.price;
      state["cakeData"] = null;
      state["isFetching"] = false;
      state["addToCart"] = true;
      return state;
    }
    case actionTypes.CART_DATA: {
      state = { ...state };
      state["cart"] = action.payload;
      state["total"] = action.total;
      state["isFetching"] = false;

      return state;
    }
    case actionTypes.REMOVE_CART_DATA: {
      state = { ...state };
      state["cart"] = state.cart.filter((x) => x.cakeid !== action.payload);
      state["total"] = state.total - action.price;
      state["isFetching"] = false;
      return state;
    }
    case actionTypes.ADD_ADDRESS: {
      state = { ...state };
      state["address"] = action.payload;
      return state;
    }
    case actionTypes.CHECKOUT_STAGE: {
      state = { ...state };
      state["stage"] = action.payload;
      return state;
    }

    case actionTypes.PLACE_ORDER: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.ORDER_SUCCESS: {
      state = { ...state };
      state["isFetching"] = false;
      state["placeOrder"] = true;
      state["cart"] = [];
      state["stage"] = 1;
      return state;
    }
    case actionTypes.ORDER_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      state["placeOrder"] = false;
      return state;
    }
    case actionTypes.GET_ORDER_INIT: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.GET_ORDER: {
      state = { ...state };
      state["isFetching"] = false;
      state["user_order"] = action.payload;
      return state;
    }
    case actionTypes.GET_ORDER_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      state["placeOrder"] = false;
      return state;
    }
    case actionTypes.FORGOT_PASSWORD_INIT: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.FORGOT_PASSWORD: {
      state = { ...state };
      state["isFetching"] = false;
      return state;
    }
    case actionTypes.FORGOT_PASSWORD_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      return state;
    }
    ////////////cakes///////////
    case actionTypes.GET_ALLCAKE_INIT: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.GET_ALLCAKE_SUCCESS: {
      state = { ...state };
      state["isFetching"] = false;
      state["allCakes"] = action.payload;
      return state;
    }
    case actionTypes.GET_ALLCAKE_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      return state;
    }
    case actionTypes.SEARCH_CAKE_INIT: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.SEARCH_CAKE_SUCCESS: {
      state = { ...state };
      state["isFetching"] = false;
      state["serchCakes"] = action.payload;
      return state;
    }
    case actionTypes.SEARCH_CAKE_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      return state;
    }
    case actionTypes.SIGN_UP_INIT: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.SIGN_UP_SUCCESS: {
      state = { ...state };
      state["isFetching"] = false;
      return state;
    }
    case actionTypes.CART_DATA_INIT: {
      state = { ...state };
      state["isFetching"] = true;
      state["addToCart"] = false;
      return state;
    }
    case actionTypes.CART_DATA_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      return state;
    }
    case actionTypes.ADD_CART_INIT: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.ADD_CART_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      state["addToCart"] = false;
      return state;
    }
    case actionTypes.REMOVE_CART_INIT: {
      state = { ...state };
      state["isFetching"] = true;
      return state;
    }
    case actionTypes.REMOVE_CART_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      return state;
    }
    case actionTypes.GET_CAKE_INIT: {
      state = { ...state };
      state["isFetching"] = true;
      state["addToCart"] = false;
      return state;
    }
    case actionTypes.GET_CAKE_SUCCESS: {
      state = { ...state };
      state["isFetching"] = false;
      state["cakeData"] = action.payload;
      return state;
    }
    case actionTypes.GET_CAKE_FAIL: {
      state = { ...state };
      state["isFetching"] = false;
      return state;
    }
    case actionTypes.SET_ORDER_STATUS: {
      state = { ...state };
      state["placeOrder"] = false;
      return state;
    }
    default:
      return state;
  }
};

export default demo;
