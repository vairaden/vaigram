import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

api.interceptors.request.use((config: AxiosRequestConfig<string>) => {
  if (!config.headers) throw new Error("No headers");
  config.headers.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;

  return config;
});

api.interceptors.response.use(
  (config: AxiosResponse) => config,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    let isRetry = false;

    if (!error.response) throw new Error("No response in interceptor");

    if (error.response.status === 401 && error.config && !isRetry) {
      isRetry = true;
      const response = await axios.get(`${process.env.BASE_URL}/api/tokens/refresh`, {
        withCredentials: true,
      });
      sessionStorage.setItem("accessToken", response.data.accessToken);
      return api.request(originalRequest);
    }

    throw error;
  }
);

export default api;
