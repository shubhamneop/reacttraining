import axios, { loginApi } from "../api";

function login(action) {
  return axios.post(loginApi, action.payload);
}

function loginSaga() {}

function* loginGenerater() {}
