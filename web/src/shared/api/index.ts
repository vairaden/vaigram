import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface IOriginalRequest extends AxiosRequestConfig {
  sent?: boolean;
}

const api = axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (!config.headers) throw new Error("No headers");

    config.headers.authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;

    return config;
  },
  (error: any) => Promise.reject(error)
);

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const originalRequest: IOriginalRequest = error.config;

    if (!error.response) throw new Error("No response in interceptor");

    if (error.response.status === 401 && !originalRequest.sent) {
      originalRequest.sent = true;
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
        withCredentials: true,
      });

      sessionStorage.setItem("accessToken", response.data.accessToken);

      if (!originalRequest.headers) throw new Error("No headers");
      originalRequest.headers.authorization = `Bearer ${response.data.accessToken}`;

      return api.request(originalRequest);
    }

    Promise.reject(error);
  }
);

export { api };
