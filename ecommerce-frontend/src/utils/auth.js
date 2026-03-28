export const AUTH_CHANGE_EVENT = "auth-changed";

export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => Boolean(getToken());

export const setToken = (token) => {
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};
