import { createStore, applyMiddleware } from "redux";
import demo from "./reducer";
import { logger } from "./middlewares";
import createSaga from "redux-saga";
import { mainSaga } from "./sagas";
import { cakesSaga } from "./cakesaga";
import { all } from "redux-saga/effects";
import { cartSagas } from "./cartsagas";

var sagaMiddleware = createSaga();
var middleware = applyMiddleware(logger, sagaMiddleware);

let store = createStore(demo, middleware);

function* rootSaga() {
  yield all([mainSaga(), cakesSaga(), cartSagas()]);
}
// sagaMiddleware.run(loginSaga);
// sagaMiddleware.run(addCakeSaga);
// sagaMiddleware.run(getCakeSaga);
sagaMiddleware.run(rootSaga);
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
