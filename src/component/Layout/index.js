import React from "react";
import { BrowserRouter, Redirect, Route, Switch, useLocation } from "react-router-dom";
import Home from "../Home";
import Header from "./Header";
import Login from "../Login";
import CreateNewMovie from "../Home/components/CreateNewMovie";
import SignUp from "../Signup";
import ProtectedRoutes from "../../utils/ProtectedRoutes";

const DefaultLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

const AuthLayout = ({ children }) => <>{children}</>;
function Layout() {
  return (
    <BrowserRouter>
      <Switch>
      <RouteWrapper exact={true} path="/login" component={Login} layout={AuthLayout} />
    <RouteWrapper exact={true} path="/signup" component={SignUp} layout={AuthLayout} />
        <ProtectedRoutes>
      <RouteWrapper exact={true} path="/" component={Home} layout={DefaultLayout} />
      <RouteWrapper exact={true} path="/create-movie" component={CreateNewMovie} layout={DefaultLayout} />
      <RouteWrapper exact={true} path="/edit-movie/:id" component={CreateNewMovie} layout={DefaultLayout} />
    </ProtectedRoutes>
      </Switch>
    </BrowserRouter>
  );
}

function RouteWrapper({ component: Component, layout: Layout, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />{" "}
        </Layout>
      )}
    />
  );
}
export default Layout;
