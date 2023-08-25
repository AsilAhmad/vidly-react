import http from "./httpService";
import {apiUrl} from "../config.json"
//import config from "../config.json" if we use this

export function getGenres() {
  return http.get(apiUrl+"/genres");
}

//  export function getGenres() {
//   return http.get(congig.apiUrl+"/genres");
// }