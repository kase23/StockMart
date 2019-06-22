import orderReducer from "./orderReducer";
import authReducer from "./authReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  orders: orderReducer
});

export default rootReducer;
