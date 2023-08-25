import axios from "axios";
//import { toast } from "react-toastify"; //149
//import auth from "./authService";  //182 auth and httpservice are bi-directional dependencies

//axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
//181 used to call protected api so only login users can make changes

//axios.interceptors.response.use(sucess,error)
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    //unexpected error using !
    // if (expectedError) return Promise.reject(error);
    //console.log("INTERCEPTOR CALLED");
    console.log("Logging the Error", error);
    //toast("Unexpected Error Occurrred.");
    //toast.error("Unexpected Error Occurrred.");
    alert("Unexpected Error Occurrred.");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt; // jwt here is argument
} //182 bi directional dependencies fixing

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,//182 bi directional dependencies fixing
};
