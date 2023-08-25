//172
import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode"; //180

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt()); //182 bi directional dependencies fixing

// export function login(email, password) {
//     return http.post(apiEndpoint, { email, password });
//   }

//180 refactoring

//for loginForm

export async function login(email, password) {
  //return http.post(apiEndpoint, { email, password }); 180
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

//logout
export function logout() {
  localStorage.removeItem(tokenKey);
}

//register
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
    //const user = jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
