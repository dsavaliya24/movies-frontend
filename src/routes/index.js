import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../component/Layout";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          render={() => {
            return <Layout />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}
