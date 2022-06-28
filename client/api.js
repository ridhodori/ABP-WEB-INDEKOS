import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "/api",
});

const onResponseSuccess = (response) => {
  return response.data;
};

api.interceptors.response.use(onResponseSuccess);

export const fetcher = (url, config) => api.get(url, config).then((res) => res);

export default api;
