import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import routeMap from "./routeMap";

const Router = () => {
  return (
    <Switch>
      {routeMap.map((item, index) => <Route
        key={index}
        path={item.path}
        component={item.component}
        exact={item.exact || false}
      />)}
    </Switch>
  );
};

export default withRouter(Router);
