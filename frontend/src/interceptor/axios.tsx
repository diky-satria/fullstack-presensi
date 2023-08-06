import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_URL_API,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("persist:root");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axios;
