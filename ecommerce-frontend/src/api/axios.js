import axios from "axios";

const deployedBackendUrl = "https://e-commerce-application-ren0.onrender.com";
const isLocalhost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    (isLocalhost ? "http://localhost:5000" : deployedBackendUrl),
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
