import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import authReducerError from "./authError/reducer";

const reducer = combineReducers({
  auth: authReducer,
  authError: authReducerError,
});

export default reducer;
