import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001/icepatterns/",
});

api.interceptors.request.use(
  (config) => {
    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");

    if (token) {
      console.log("entrou");
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;