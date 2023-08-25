import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
//import { login } from "../services/authService"; //180
import auth from "../services/authService";
//187
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //172 submmitting login form
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password); //180
      // const { data: jwt } = await login(data.username, data.password); 180 we modified this
      // localStorage.setItem("token", jwt);  180 authService we removed this
      //console.log(jwt);

      //187 we using this if user click movie and login after they dont go homepage instead go to
      //the link they clicked //"from" is from protectedRoute
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      // this is used to reload page if user login otherwise we have to
      // referesh page if we use the below method
      //  this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        errors.password = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />; //187 so user if login cant use url to login again if alredy login
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
