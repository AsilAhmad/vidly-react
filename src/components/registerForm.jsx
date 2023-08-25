import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    //170
    try {
      const response = await userService.register(this.state.data);
      //console.log(response);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //localStorage.setItem("token", response.headers["x-auth-token"]); //180
      window.location = "/";
      // this is used to reload page if user login otherwise we have to
      // referesh page if we use the below method
      //this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }; //we copying the error object that shows redbar under email or username error
        errors.username = ex.response.data; //this used backend message to show the user //you can see it in network>user>response
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
