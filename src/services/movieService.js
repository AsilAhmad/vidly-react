import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}
export function getMovie(movieId) {
  return http.get(movieUrl(movieId)); //fixed the bug of notFound
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndpoint + "/" + movie._id, body);
  }
  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  //(movieId) can be any name
  return http.delete(movieUrl(movieId));
}



// import http from "./httpService";
// import { apiUrl } from "../config.json";

// const apiEndpoint = "http://localhost:3900/api/movies"

// export function getMovies() {
//   return http.get(apiEndpoint);
// }
// export function getMovie(movieId) {
//   return http.get(apiEndpoint + "/" + movieId); //fixed the bug of notFound
// }
// export function saveMovie(movie) {
//   if (movie._id) {
//     const body = { ...movie };
//     delete body._id;
//     return http.put(apiEndpoint + "/" + movie._id, body);
//   }
//   return http.post(apiEndpoint, movie);
// }

// export function deleteMovie(movieId) {
//   //(movieId) can be any name
//   return http.delete(apiEndpoint + "/" + movieId);
// }
