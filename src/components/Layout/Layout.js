import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LayoutStyles from "./Layout.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GuardProvider, GuardedRoute } from "react-router-guards";

const Flight = React.lazy(() => import("../Feature/Flight/Flight"));
const Passenger = React.lazy(() => import("../Feature/Passenger/Passenger"));
const FlightDetail = React.lazy(() =>
  import("../Feature/FlightDetail/FlightDetail")
);
const PassengerList = React.lazy(() =>
  import("../Feature/PassengerList/PassengerList")
);
const InFlight = React.lazy(() => import("../Feature/InFlight/InFlight"));
const AdminHome = React.lazy(() =>
  import("../containers/Admin/AdminHome/AdminHome")
);
const AdminOperation = React.lazy(() =>
  import("../containers/Admin/AdminOperation/AdminOperation")
);
const PageNotFound = React.lazy(() => import("../PageNotFound"));

const Layout = () => {
  const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
      if (localStorage.getItem("email")) {
        if (to.meta.admin) {
          if (localStorage.getItem("isAdmin") === "true") {
            next();
          }
          next.redirect("/login");
        }
        next();
      }
      next.redirect("/login");
    } else {
      next();
    }
  };
  return (
    <div className={LayoutStyles["parent-wrapper"]}>
      <Suspense
        fallback={<CircularProgress className={LayoutStyles.Progress} />}
      >
        <GuardProvider guards={[requireLogin]} error={PageNotFound}>
          <Switch>
            <Route path="/" exact component={Flight}></Route>
            <GuardedRoute
              path="/flight-detail/:id"
              component={FlightDetail}
              meta={{ auth: true, admin: false }}
            />
            <Route path="/passenger/:id" component={Passenger}></Route>
            <GuardedRoute
              path="/passenger-list/:id"
              component={PassengerList}
              meta={{ auth: true, admin: false }}
            />
            <GuardedRoute
              path="/in-flight/:id"
              exact
              component={InFlight}
              meta={{ auth: true, admin: false }}
            />
            <GuardedRoute
              path="/admin-home"
              component={AdminHome}
              meta={{ auth: true, admin: true }}
            />
            <GuardedRoute
              path="/admin-operation/:id"
              component={AdminOperation}
              meta={{ auth: true, admin: true }}
            />

            <GuardedRoute component={PageNotFound} />
          </Switch>
        </GuardProvider>
      </Suspense>
    </div>
  );
};

export default Layout;
