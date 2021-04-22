import store from "./store";

export function FirstMiddleware(store) {
  return function (next) {
    return function (action) {
      console.log("Before Action ", action.type, store.getState());

      var result = next(action);
      console.log("......", store.getState());
      return result;
    };
  };
}

export const logger = (store) => (next) => (action) => {
  console.log("Before Action ", action.type, store.getState());

  var result = next(action);
  console.log("......", store.getState());
  return result;
};
