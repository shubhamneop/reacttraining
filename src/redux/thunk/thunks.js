import * as actionTypes from "../actionTypes";

export const getOrderInit = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_ORDER_INIT,
    });
  };
};

export const setOrderStatus = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_ORDER_STATUS,
    });
  };
};

export const getAllCakeInit = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALLCAKE_INIT,
    });
  };
};

export const setCheckoutStage = (stage) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_STAGE,
      payload: stage,
    });
  };
};

export const addAddress = (address) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_ADDRESS, payload: address });
  };
};

export const cartDataInit = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CART_DATA_INIT });
  };
};
