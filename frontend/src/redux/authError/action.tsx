export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_LOADING_FINISH = "AUTH_LOADING_FINISH";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_ERROR_DELETE = "AUTH_ERROR_DELETE";

export const authLoading = () => {
  return {
    type: AUTH_LOADING,
  };
};

export const authLoadingFinish = () => {
  return {
    type: AUTH_LOADING_FINISH,
  };
};

export const authError = (payload: any) => {
  return {
    type: AUTH_ERROR,
    payload,
  };
};

export const authErrorDelete = () => {
  return {
    type: AUTH_ERROR_DELETE,
  };
};
