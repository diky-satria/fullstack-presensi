import {
  AUTH_SUCCESS_API_LOGIN,
  AUTH_SUCCESS_API_ME,
  AUTH_LOGOUT,
  AUTH_ERROR_EXPIRED,
} from "./action";

const authInitialState = {
  user: null,
};

const initialState = {
  ...authInitialState,
  action: "",
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_ERROR_EXPIRED:
      return {
        ...state,
        user: null,
        action: action.type,
      };
    case AUTH_SUCCESS_API_LOGIN:
      return {
        ...state,
        action: action.type,
        user: action.payload.data,
      };
    case AUTH_SUCCESS_API_ME:
      return {
        ...state,
        action: action.type,
        user: action.payload,
      };
    case AUTH_LOGOUT:
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
