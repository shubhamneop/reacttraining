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

function login(action) {
  return axios.post(loginApi, action.payload);
}

function* loginGenerater(action) {
  try {
    const result = yield call(login, action);
    if (result.data.token) {
      yield put({ type: "LOGIN_SUCCESS", payload: result.data });
      action.history.push("/");
      toast.success(`Login Successfull !!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      yield put({ type: "LOGIN_FAIL" });
      toast.error(`Invalid Credential !!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    yield put({ type: "LOGIN_FAIL" });
    toast.error(`Invalid Credential !!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export function* loginSaga() {
  yield takeEvery("LOGIN", loginGenerater);
}

function addCake(action) {
  return axios.post(addCakeOrderApi, action.payload);
}

function* addCakeGenerator(action) {
  try {
    var result = yield call(addCake, action);
    if (result.data.error) {
      yield put({ type: "ORDER_FAIL" });
    } else {
      yield put({ type: "ORDER_SUCCESS" });
      toast.success(`Order Placed !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (error) {
    yield put({ type: "ORDER_FAIL" });
  }
}

export function* addCakeSaga() {
  yield takeEvery("PLACE_ORDER", addCakeGenerator);
}

function getCake() {
  return axios.post(cakeOrdersApi);
}

function* getCakeGenerator(action) {
  try {
    var result = yield call(getCake, action);
    if (result.data.cakeorders) {
      yield put({ type: "GET_ORDER", payload: result.data.cakeorders });
    } else {
      yield put({ type: "GET_ORDER_FAIL" });
    }
  } catch (error) {
    yield put({ type: "GET_ORDER_FAIL" });
    console.log("error get cake", error);
  }
}

export function* getCakeSaga() {
  yield takeEvery("GET_ORDER_INIT", getCakeGenerator);
}

function forgotPassword(action) {
  return axios.post(recoverPwdApi, action.payload);
}

function* passwordGenerator(action) {
  const result = yield call(forgotPassword, action);
  try {
    yield put({ type: "FORGOT_PASSWORD" });
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
    yield put({ type: "FORGOT_PASSWORD_FAIL" });
    console.log("error forgot pwd", error);
  }
}

export function* passwordSaga() {
  yield takeEvery("FORGOT_PASSWORD_INIT", passwordGenerator);
}

function signUp(action) {
  return axios.post(signUpApi, action.payload);
}

function* signupGenerator(action) {
  try {
    const result = yield call(signUp, action);
    yield put({ type: "SIGN_UP_SUCCESS" });
    if (result.data.message) {
      toast.success(`${result.data.message} !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      yield put({
        type: "LOGIN",
        payload: action.payload,
      });
    }
  } catch (error) {
    console.log("error signup", error);
  }
}

export function* SignUpSaga() {
  yield takeEvery("SIGN_UP_INIT", signupGenerator);
}

function initUser(action) {
  return axios.get(getUserDetailsApi);
}

function* initUserGenerator(action) {
  try {
    const response = yield call(initUser, action);
    if (response.data?.data?.token) {
      yield put({
        type: "INIT_USER_SUCCESS",
        payload: response.data.data,
      });
    } else {
      yield put({ type: "INIT_USER_FAIL" });
    }
  } catch (error) {
    yield put({ type: "INIT_USER_FAIL" });
    console.log("error in init user", error);
  }
}

export function* initUserSaga() {
  yield takeEvery("INIT_USER", initUserGenerator);
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
