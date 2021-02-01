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

const Layout = () => {
  return (
    <div className={LayoutStyles["parent-wrapper"]}>
      <Switch>
        <Route path="/" exact component={Flight}></Route>
        <Route path="/flight-detail/:id" component={FlightDetail}></Route>
        <Route path="/passenger/:id" component={Passenger}></Route>
        <Route path="/passenger-list/:id" component={PassengerList}></Route>
        <Route path="/in-flight/:id" exact component={InFlight}></Route>
        <Route path="/admin-home" component={AdminHome}></Route>
        <Route path="/admin-operation/:id" component={AdminOperation}></Route>

        <Route component={PageNotFound}></Route>
      </Switch>
      {/* 
                    <Route path="/passenger/:id" exact component={Passenger}></Route>
                    <Route path="/in-flight/:id" exact component={InFlight}></Route>
                    <Route path="admin-operation/:id" exact component={AdminOperation}></Route>
                    <Route path="'admin-home" exact component={Home}></Route> */}
    </div>
  );
};

export default Layout;
