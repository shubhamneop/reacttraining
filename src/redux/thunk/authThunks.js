import * as actionTypes from "../actionTypes";

const LogOut = () => {
  localStorage.clear();
  return {
    type: actionTypes.LOGOUT,
  };
};

export const LogoutAsync = () => {
  return (dispatch) => {
    dispatch(LogOut());
  };
};

export const LoginThunk = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN,
      payload: data,
    });
  };
};

export const SignupThunk = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGN_UP_INIT,
      payload: data,
    });
  };
};

export const PasswordThunk = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FORGOT_PASSWORD_INIT,
      payload: data,
    });
  };
};

export const InitUser = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.INIT_USER,
    });
  };
};
