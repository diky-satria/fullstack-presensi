import {
  AUTH_LOADING,
  AUTH_LOADING_FINISH,
  AUTH_ERROR,
  AUTH_ERROR_DELETE,
} from "./action";

const authInitialState = {
  isLoading: false,
  isError: null,
};

const initialState = {
  ...authInitialState,
  action: "",
};

const authReducerError = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        action: action.type,
        isLoading: true,
      };
    case AUTH_LOADING_FINISH:
      return {
        ...state,
        action: action.type,
        isLoading: false,
        isError: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        action: action.type,
        isLoading: false,
        isError: action.payload,
      };
    case AUTH_ERROR_DELETE:
      return {
        ...state,
        action: action.type,
        isLoading: false,
        isError: null,
      };
    default:
      return state;
  }
};

export default authReducerError;
