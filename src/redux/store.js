import { createStore, applyMiddleware } from "redux";
import demo from "./reducer";
import { FirstMiddleware, logger } from "./middlewares";

var middleware = applyMiddleware(logger);

let store = createStore(demo, middleware);

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
