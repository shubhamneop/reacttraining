import * as actionTypes from "../actionTypes";

const initialState = {
  isLogin: false,
  isFetching: false,
  user: null,
  isLoginError: false,
};

const authReducer = (state = initialState, action) => {
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
      localStorage.clear();
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
    case actionTypes.LOGOUT: {
      state = { ...state };
      state["isLogin"] = false;
      state["user"] = null;
      state["isFetching"] = false;
      return state;
    }

    default:
      return state;
  }
};

export default authReducer;
