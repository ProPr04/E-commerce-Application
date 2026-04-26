import API from "../api/axios";

export const fetchProducts = async () => {
  const response = await API.get("https://e-commerce-application-ren0.onrender.com/products");
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await API.get(`https://e-commerce-application-ren0.onrender.com/products/${id}`);
  console.log(response)
  return response.data;
};
