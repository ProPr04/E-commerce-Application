import axios from "axios";



console.log(process.env.REACT_APP_API_BASE_U)
const API = axios.create({
  baseURL:
  "https://e-commerce-application-ren0.onrender.com"
    ,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
