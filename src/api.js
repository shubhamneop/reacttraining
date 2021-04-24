import axios from "axios";

const instance = axios.create({
  baseURL: "https://apibyashu.herokuapp.com/api/",
  timeout: 5000,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.authtoken = token ? `${token}` : "";
  return config;
});

export default instance;

export const getUserDetailsApi = "getuserdetails";

export const loginApi = "login";

export const signUpApi = "register";

export const recoverPwdApi = "recoverpassword";

export const allCakesApi = "allCakes";

export const cakeCartApi = "cakecart";

export const cakeDetailsApi = "cake/";

export const addToCartApi = "addcaketocart";

export const removeFromCartApi = "removecakefromcart";

export const searchCakesApi = "searchcakes?q=";
