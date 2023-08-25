import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        // if (!auth.getCurrentUser()) return <Redirect to="/login" />;after

        //187
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;

// {
//   /* <Route
//               path="/movies/:id"
//               render={(props) => {
//                 if (!user) return <Redirect to="/login" />; //if user is false we redirect to login page
//                 return <MovieForm {...props} />;
//               }}
//             /> */
// }
//How to make resuable

//path we taking props tht is path
//we using route and redirect so we need to import them
//we need user so we need it from auth serivce tht is get CUrrent user also import auth
//<MovieForm we need component:Component
//might need render so we add render in props
