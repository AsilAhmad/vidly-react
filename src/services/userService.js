
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
    return http.post(apiEndpoint, {
        email:user.username,
        password:user.password,
        name:user.name
    });
}

// export function register(email,password,name) {
//     return http.post(apiEndpoint, {email,password,name}
//     );
//   } //// this is showing errors