import orderReducer from "./orderReducer";
import authReducer from "./authReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  portfolio: orderReducer
});

export default rootReducer;
