import axios from "axios";
import { toast } from "sonner";


export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

let isHandling401 = false;


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

   
    if (status === 401 && !isHandling401) {
      isHandling401 = true;

      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (err) {
        console.error("Failed to clear token:", err);
      }

   
      toast.error("Session expired. Please log in again.");

     
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      setTimeout(() => {
        isHandling401 = false;
      }, 1000);
    }

    return Promise.reject(error);
  }
);
