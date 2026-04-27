import API from "../api/axios";

export const fetchProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};
