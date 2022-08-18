import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  if (!config.headers) throw new Error("No headers");

  config.headers.authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;

  return config;
});

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const originalRequest = { ...error.config, sent: false };

    if (!error.response) throw new Error("No response in interceptor");

    if (error.response.status === 401 && !originalRequest.sent) {
      originalRequest.sent = true;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
        withCredentials: true,
      });

      sessionStorage.setItem("accessToken", response.data.accessToken);

      return api.request(originalRequest);
    }

    throw error;
  }
);

export default api;
