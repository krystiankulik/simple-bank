import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response) {
      toast.error(error.response.data?.message || "An error occurred.");
    } else if (error.request) {
      toast.error("Network error. Please check your internet connection.");
    } else {
      toast.error(error.message || "An unexpected error occurred.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
