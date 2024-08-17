import { getSession } from "next-auth/react";
import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_FRONT_API_URL || "http://localhost:3000";

export const API = axios.create({
  baseURL: baseURL,
  // withCredentials: true, // Required to send cookies with requests, but not needed for JWT, also server must be configured to accept credentials
});

API.interceptors.request.use(
  async function (config) {
    try {
      const session = await getSession();
      if (session && session.user.token) {
        config.headers.Authorization = `Bearer ${session.user.token}`;
        console.log("Authorization header set:", config.headers.Authorization);
      }
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      throw error;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    // can be configured to handle responses here
    return response;
  },
  function (error) {
    console.error("API Response Error:", error);
    return Promise.reject(error);
  }
);
