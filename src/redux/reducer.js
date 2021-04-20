const demo = (
  state = {
    cart: [],
    total: 0,
  },
  action
) => {
  switch (action.type) {
    case "INIT_USER": {
      console.log("on init user function");
      state = { ...state };
      state["isLogin"] = true;
      state["user"] = action.payload;
      return state;
    }
    case "LOGIN": {
      console.log("on login function");
      state = { ...state };
      state["isLogin"] = true;
      state["user"] = action.payload;
      return state;
    }
    case "LOGOUT": {
      console.log("logout reducer");
      state = { ...state };
      localStorage.clear();
      state["isLogin"] = false;
      state["user"] = {};
      state["cart"] = [];
      state["total"] = 0;
      return state;
    }
    case "ADD_CART": {
      state = { ...state };
      state["cart"] = [...state.cart, action.payload];
      state["total"] = state.total + action.payload.price;
      return state;
    }
    case "CART_DATA": {
      state = { ...state };
      state["cart"] = action.payload;
      state["total"] = action.total;
      console.log("cart total", state.total);

      return state;
    }
    case "REMOVE_CART_DATA": {
      console.log("on remove", action);
      state = { ...state };
      state["cart"] = state.cart.filter((x) => x.cakeid !== action.payload);
      state["total"] = state.total - action.price;
      console.log("remove reducer cart", state);
      return state;
    }
    case "ADD_ADDRESS": {
      state = { ...state };
      state["address"] = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default demo;
