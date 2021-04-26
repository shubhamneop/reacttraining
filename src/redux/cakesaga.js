import axios, { allCakesApi, searchCakesApi, cakeDetailsApi } from "../api";
import { call, takeEvery, put, all } from "redux-saga/effects";

function allCake(action) {
  return axios.get(allCakesApi);
}

function* allCakesGenerater(action) {
  try {
    var result = yield call(allCake, action);
    yield put({ type: "GET_ALLCAKE_SUCCESS", payload: result.data.data });
  } catch (error) {
    yield put({ type: "GET_ALLCAKE_FAIL" });
    console.log("all cake error", error);
  }
}

export function* allCakeSaga() {
  yield takeEvery("GET_ALLCAKE_INIT", allCakesGenerater);
}

function searchCake(action) {
  return axios.get(searchCakesApi + action.payload);
}

function* searchCakeGenerator(action) {
  try {
    const result = yield call(searchCake, action);
    yield put({ type: "SEARCH_CAKE_SUCCESS", payload: result.data.data });
  } catch (error) {
    yield put({ type: "SEARCH_CAKE_FAIL" });
    console.log("seach cake error", error);
  }
}

export function* searchCakeSaga() {
  yield takeEvery("SEARCH_CAKE_INIT", searchCakeGenerator);
}

function getCakeData(action) {
  return axios.get(cakeDetailsApi + action.payload);
}

function* getCakeGenerator(action) {
  try {
    const response = yield call(getCakeData, action);
    if (response.data?.data) {
      yield put({ type: "GET_CAKE_SUCCESS", payload: response.data.data });
    } else {
      yield put({ type: "GET_CAKE_FAIL" });
    }
  } catch (error) {
    yield put({ type: "GET_CAKE_FAIL" });
  }
}

export function* getCakeDataSaga() {
  yield takeEvery("GET_CAKE_INIT", getCakeGenerator);
}

export function* cakesSaga() {
  yield all([allCakeSaga(), searchCakeSaga(), getCakeDataSaga()]);
}
