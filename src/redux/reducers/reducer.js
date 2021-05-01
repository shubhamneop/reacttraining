import * as actionTypes from "../actionTypes";

const initialState = {
  cart: [],
  total: 0,
  stage: 1,
  user_order: [],
  allCakes: [],
  serchCakes: [],
  cakeData: null,
  placeOrder: false,
  addToCart: false,
};

const demo = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT: {
      state = { ...state };
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
      state["cart"] = state.cart.filter((x) => x._id !== action.payload);
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
