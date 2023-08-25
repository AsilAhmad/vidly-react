import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";
//to see users in navbar as login
//import jwtDecode from "jwt-decode"; //177
import Logout from "./components/logout"; //179 remember to add route
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {}; // 177 for user to show

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  // componentDidMount() {
  //   //177 to get user // npm i jwt-decode@2.2.0
  //   try {
  //     const jwt = localStorage.getItem("token");
  //     const user = jwtDecode(jwt);
  //     console.log(user);
  //     this.setState({ user });
  //   } catch (ex) {}
  // }

  render() {
    
    const { user } = this.state; //185

    return (
      <React.Fragment>
        
        {/* <NavBar/> */}
        {/* <NavBar user={this.state.user} /> //185 object destructuring*/}
        <NavBar user={user} />

        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />

            {/* 185 protecting route so when user cant see a button they can still user url.../new to  go to movie form */}
            {/* <Route path="/movies/:id" component={MovieForm} /> */}
            {/* <Route
              path="/movies/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login" />; //if user is false we redirect to login page
                return <MovieForm {...props} />;
              }}
            /> */}
            {/* 186 Protected Route */}
            <ProtectedRoute path="/movies/:id" component={MovieForm} />

            {/* <Route path="/movies" component={Movies} /> */}
            {/* 184 below we adding user so it can hide certain elements */}
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
