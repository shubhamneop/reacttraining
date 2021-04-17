const demo = (state, action) => {
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
      return state;
    }
    default:
      return state;
  }
};

export default demo;
