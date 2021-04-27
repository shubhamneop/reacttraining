import axios, {
  loginApi,
  addCakeOrderApi,
  cakeOrdersApi,
  recoverPwdApi,
  signUpApi,
  getUserDetailsApi,
} from "../api";
import { call, put, takeEvery, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actionTypes from "./actionTypes";

function login(action) {
  return axios.post(loginApi, action.payload);
}

function* loginGenerater(action) {
  try {
    const result = yield call(login, action);
    if (result.data.token) {
      yield put({ type: actionTypes.LOGIN_SUCCESS, payload: result.data });

      toast.success(`Login Successfull !!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      yield put({ type: actionTypes.LOGIN_FAIL });
      toast.error(`Invalid Credential !!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.LOGIN_FAIL });
    toast.error(`Invalid Credential !!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export function* loginSaga() {
  yield takeEvery(actionTypes.LOGIN, loginGenerater);
}

function addCake(action) {
  return axios.post(addCakeOrderApi, action.payload);
}

function* addCakeGenerator(action) {
  try {
    var result = yield call(addCake, action);
    if (result.data.error) {
      yield put({ type: actionTypes.ORDER_FAIL });
    } else {
      yield put({ type: actionTypes.ORDER_SUCCESS });
      toast.success(`Order Placed !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.ORDER_FAIL });
  }
}

export function* addCakeSaga() {
  yield takeEvery(actionTypes.PLACE_ORDER, addCakeGenerator);
}

function getCake() {
  return axios.post(cakeOrdersApi);
}

function* getCakeGenerator(action) {
  try {
    var result = yield call(getCake, action);
    if (result.data.cakeorders) {
      yield put({
        type: actionTypes.GET_ORDER,
        payload: result.data.cakeorders,
      });
    } else {
      yield put({ type: actionTypes.GET_ORDER_FAIL });
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_ORDER_FAIL });
    console.log("error get cake", error);
  }
}

export function* getCakeSaga() {
  yield takeEvery(actionTypes.GET_ORDER_INIT, getCakeGenerator);
}

function forgotPassword(action) {
  return axios.post(recoverPwdApi, action.payload);
}

function* passwordGenerator(action) {
  const result = yield call(forgotPassword, action);
  try {
    yield put({ type: actionTypes.FORGOT_PASSWORD });
    if (result.data.errorMessage) {
      toast.error(`${result.data.errorMessage} !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (result.data.message) {
      toast.success(`${result.data.message} !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.FORGOT_PASSWORD_FAIL });
    console.log("error forgot pwd", error);
  }
}

export function* passwordSaga() {
  yield takeEvery(actionTypes.FORGOT_PASSWORD_INIT, passwordGenerator);
}

function signUp(action) {
  return axios.post(signUpApi, action.payload);
}

function* signupGenerator(action) {
  try {
    const result = yield call(signUp, action);
    yield put({ type: actionTypes.SIGN_UP_SUCCESS });
    if (result.data.message) {
      toast.success(`${result.data.message} !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    console.log("error signup", error);
  }
}

export function* SignUpSaga() {
  yield takeEvery(actionTypes.SIGN_UP_INIT, signupGenerator);
}

function initUser(action) {
  return axios.get(getUserDetailsApi);
}

function* initUserGenerator(action) {
  try {
    const response = yield call(initUser, action);
    if (response.data?.data?.token) {
      yield put({
        type: actionTypes.INIT_USER_SUCCESS,
        payload: response.data.data,
      });
    } else {
      yield put({ type: actionTypes.INIT_USER_FAIL });
    }
  } catch (error) {
    yield put({ type: actionTypes.INIT_USER_FAIL });
    console.log("error in init user", error);
  }
}

export function* initUserSaga() {
  yield takeEvery(actionTypes.INIT_USER, initUserGenerator);
}

export function* mainSaga() {
  yield all([
    loginSaga(),
    addCakeSaga(),
    getCakeSaga(),
    passwordSaga(),
    SignUpSaga(),
    initUserSaga(),
  ]);
}
