import axios from "axios";
import {
  AxiosInterceptorOnFullFilled,
  AxiosInterceptorOnRejected,
} from "./axiosInterceptors";

const apiClient = axios.create({
  baseURL: "/",
  headers: {
    Authorization: "Bearer ",
    "Content-type": "application/json",
  },
});

apiClient.interceptors.response.use(
  AxiosInterceptorOnFullFilled,
  AxiosInterceptorOnRejected
);

export default apiClient;

export function setAxiosAuthorizationToken(token) {
  apiClient.defaults.headers["Authorization"] = "Bearer " + token;
}
