import { createStore } from "redux";
import demo from "./reducer";

let store = createStore(demo);

// store.dispatch({
//   type: "login",
// });

// console.log("before login", store.getState());

// store.dispatch({
//   type: "LOGIN",
//   payload: { email: "shubham@gmail.com", name: "shubham" },
// });

// console.log("after login", store.getState());

export default store;
