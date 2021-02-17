import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { httpGet } from "../../../utils/api/http-calls";
import classes from "./Flight.module.scss";
import * as moment from "moment";

class Flight extends Component {
  state = {
    items: [],
  };
  componentDidMount() {
    httpGet("http://localhost:3000/flights").then((response) => {
      this.setState({ items: response.data });
    });
  }
  flightDetail = (id) => {
    this.props.history.push("/flight-detail/" + id);
  };
  inFlight = (id) => {
    this.props.history.push("/in-flight/" + id);
  };
  renderCard = () =>
    this.state.items.map((item) => (
      <Card key={item.id} className={classes.Flightcard}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {item.airline}
          </Typography>
          <Typography color="textSecondary">
            {item.from} to {item.to}
          </Typography>
          <Typography color="textSecondary">
            <b>Departure:</b> {moment(item.departure).format("LT")}
            <span>&nbsp;</span>
            <b>Arrival:</b> {moment(item.arrival).format("LT")}
          </Typography>
        </CardContent>
        <Typography>
          <Button color="secondary" onClick={() => this.flightDetail(item.id)}>
            Check-In
          </Button>
          <Button color="primary" onClick={() => this.inFlight(item.id)}>
            In-Flight
          </Button>
        </Typography>
      </Card>
    ));
  render() {
    return (
      <Fragment>
        <br></br>
        {this.renderCard()}
      </Fragment>
    );
  }
}

export default Flight;
