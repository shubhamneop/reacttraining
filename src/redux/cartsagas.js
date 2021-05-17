import axios, { cakeCartApi, addToCartApi, removeFromCartApi } from "../api";
import { call, takeEvery, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actionTypes from "./actionTypes";

function getCartData(action) {
  return axios.post(cakeCartApi, {});
}

function* getCartGenerator(action) {
  try {
    const response = yield call(getCartData, action);
    var total = 0;
    if (response.data.data) {
      response.data.data.map(({ price }) => {
        return (total = total + price);
      });
      yield put({
        type: actionTypes.CART_DATA,
        payload: response.data.data,
        total: total,
      });
    } else {
      yield put({ type: actionTypes.CART_DATA_FAIL });
    }
  } catch (error) {
    yield put({ type: actionTypes.CART_DATA_FAIL });
    console.log("cart error", error);
  }
}

export function* cartDataSaga() {
  yield takeEvery(actionTypes.CART_DATA_INIT, getCartGenerator);
}

function addToCart(action) {
  return axios.post(addToCartApi, action.payload);
}

function* addtocartGenearator(action) {
  try {
    var response = yield call(addToCart, action);
    if (response.data.data) {
      yield put({
        type: actionTypes.ADD_CART,
        payload: response.data.data,
      });
      toast.success("Cake Added in cart !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      yield put({ type: actionTypes.ADD_CART_FAIL });
      toast.error("Cake not Added in cart !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.ADD_CART_FAIL });
    toast.error("Cake not Added in cart !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log("error in add cart", error);
  }
}

export function* addToCartSaga() {
  yield takeEvery(actionTypes.ADD_CART_INIT, addtocartGenearator);
}

function removeCake(action) {
  return axios.post(removeFromCartApi, action.payload);
}

function* removeCakeGenerator(action) {
  try {
    const response = yield call(removeCake, action);
    yield put({
      type: actionTypes.REMOVE_CART_DATA,
      payload: action.id,
      price: action.price,
    });
    toast.success(`${response.data.message} !`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    yield put({ type: actionTypes.REMOVE_CART_FAIL });
    console.log("error in remove cart", error);
  }
}

export function* removeCakeSaga() {
  yield takeEvery(actionTypes.REMOVE_CART_INIT, removeCakeGenerator);
}

export function* cartSagas() {
  yield all([cartDataSaga(), addToCartSaga(), removeCakeSaga()]);
}
