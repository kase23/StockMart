import orderReducer from "./orderStore";
import authReducer from "./authStore";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  orders: orderReducer
});

export default rootReducer;
