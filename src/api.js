import axios from "axios";

const instance = axios.create({
  baseURL: "https://apibyashu.herokuapp.com/api/",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.authtoken = token ? `${token}` : "";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);

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

export const addCakeOrderApi = "addcakeorder"; //post

export const cakeOrdersApi = "cakeorders"; //post

//price,name,address,city,pincode,cakes,phone
