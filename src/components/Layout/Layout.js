import React from "react";
import { Route, Switch } from "react-router-dom";
import LayoutStyles from "./Layout.module.scss";
import Flight from "../Feature/Flight/Flight";
import PageNotFound from "../PageNotFound";
import FlightDetail from "../Feature/FlightDetail/FlightDetail";
import PassengerList from "../Feature/PassengerList/PassengerList";
import AdminHome from "../containers/Admin/AdminHome/AdminHome";
import AdminOperation from "../containers/Admin/AdminOperation/AdminOperation";
import Passenger from "../Feature/Passenger/Passenger";
import InFlight from "../Feature/InFlight/InFlight";
import { GuardProvider, GuardedRoute } from "react-router-guards";

const Layout = () => {
  const requireLogin = (to, from, next) => {
    // if (to.meta.auth) {
    //   if (localStorage.getItem("email")) {
    //     if (to.meta.admin) {
    //       if (localStorage.getItem("isAdmin") === "true") {
    //         next();
    //       }
    //       next.redirect("/login");
    //     }
    //     next();
    //   }
    //   next.redirect("/login");
    // } else {
    next();
    //}
  };
  return (
    <div className={LayoutStyles["parent-wrapper"]}>
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
    </div>
  );
};

export default Layout;
