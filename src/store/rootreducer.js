import orderReducer from "./orderStore";
import authReducer from "./authStore";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: authReducer,
  orders: orderReducer
});

export default rootReducer;

export * from "./authStore.js";
