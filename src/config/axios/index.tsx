import axios from "axios";

const api = axios.create({
  baseURL: "https://icepatterns-backend-bd993106e512.herokuapp.com/icepatterns/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.defaults.headers.common['Cache-Control'] = 'no-cache';
api.defaults.headers.common.Pragma = 'no-cache';
api.defaults.headers.common.Expires = '0';

export default api;