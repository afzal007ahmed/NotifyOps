import axios from "axios";
import { config } from "@/config/index";
import { routes } from "@/routes/routes";
import { toast } from "sonner";

export const axiosInterceptor = axios.create({ baseURL: config.baseUrl });

axiosInterceptor.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

axiosInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data.message || "Something went wrong");
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = routes.LOGIN;
    }
    return Promise.reject(error);
  },
);
