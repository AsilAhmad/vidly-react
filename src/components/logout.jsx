import { Component } from "react"; //179 logout
//import { logout } from "../services/authService"; //180
import auth from "../services/authService"; //180

class Logout extends Component {
  componentDidMount() {
    //logout();  //180
    auth.logout(); //180
    // localStorage.removeItem("token"); // 180 authService
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
