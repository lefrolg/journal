import { setAxiosAuthorizationToken } from "@/services/apiClient";

export function isHrAuthenticated() {
  return !!localStorage.getItem("hrportal_token");
}
export function setAuth(user) {
  if (user.token) {
    localStorage.setItem("hrportal_token", user.token);
    setAxiosAuthorizationToken(user.token);
    delete user.token;
  }
  localStorage.setItem("hrportal_client", JSON.stringify(user));
  return user;
}

export function getUserToken() {
  return localStorage.getItem("hrportal_token");
}

export function getUser() {
  return JSON.parse(localStorage.getItem("hrportal_client"));
}

export function userLogout() {
  localStorage.removeItem("hrportal_client");
  localStorage.removeItem("hrportal_token");
}
