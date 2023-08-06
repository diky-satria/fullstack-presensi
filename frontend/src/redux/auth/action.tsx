import axios from "../../interceptor/axios";
import { authLoading, authLoadingFinish, authError } from "../authError/action";
import toast from "react-hot-toast";

import { TLoginApi } from "../../type";

export const AUTH_ERROR_EXPIRED = "AUTH_ERROR_EXPIRED";
export const AUTH_SUCCESS_API_LOGIN = "AUTH_SUCCESS_API_LOGIN";
export const AUTH_SUCCESS_API_ME = "AUTH_SUCCESS_API_ME";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const loginApi = (payload: TLoginApi): any => {
  return async (dispatch: any) => {
    dispatch(authLoading());
    try {
      let response = await axios.post("/api/v1/login", payload);

      dispatch(authSuccessApiLogin(response.data));

      dispatch(authLoadingFinish());

      dispatch(meApi());
    } catch (error: any) {
      dispatch(authError(error.response.data.errors));
    }
  };
};

export const meApi = () => {
  return async (dispatch: any) => {
    try {
      let response = await axios.get("/api/v1/me");

      dispatch(authSuccessApiMe(response.data));
    } catch (error: any) {
      dispatch(authErrorExpired(error.response.data));
    }
  };
};

export const logoutApi = (navigate: any): any => {
  return async (dispatch: any) => {
    try {
      await axios.delete("/api/v1/logout");

      dispatch(authLogout());

      navigate("/");

      toast.success("Anda berhasil logout", {
        position: "top-right",
        duration: 2000,
        iconTheme: {
          primary: "#1bff1f",
          secondary: "#000000",
        },
        style: {
          borderRadius: "10px",
          background: "#1bff23",
          color: "#000000",
        },
      });
    } catch (error: any) {
      dispatch(authErrorExpired(error.response));
    }
  };
};

export const authSuccessApiLogin = (payload: any) => {
  return {
    type: AUTH_SUCCESS_API_LOGIN,
    payload,
  };
};

export const authSuccessApiMe = (payload: any) => {
  return {
    type: AUTH_SUCCESS_API_ME,
    payload,
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const authErrorExpired = (payload: any) => {
  return {
    type: AUTH_ERROR_EXPIRED,
    payload,
  };
};
