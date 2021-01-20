import React, { Suspense, Fragment } from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LayoutStyles from "./Layout.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import Flight from "../Feature/Flight/Flight";

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

const Layout = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={LayoutStyles["parent-wrapper"]}>
        <Suspense fallback={<CircularProgress className={classes.progress} />}>
          <Route path="/" exact component={Flight}></Route>
          {/* <Route path="/flight-detail/:id" exact component={FlightDetail}></Route>
                    <Route path="/passenger/:id" exact component={Passenger}></Route>
                    <Route path="/passenger-list/:id" exact component={PassengerList}></Route>
                    <Route path="/in-flight/:id" exact component={InFlight}></Route>
                    <Route path="admin-operation/:id" exact component={AdminOperation}></Route>
                    <Route path="'admin-home" exact component={Home}></Route> */}
        </Suspense>
      </div>
    </Fragment>
  );
};

export default Layout;
