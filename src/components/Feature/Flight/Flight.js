import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { httpGet } from "../../../utils/api/http-calls";
import classes from "./Flight.module.scss";

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
  // checkIn = (id) => {
  //   this.props.history.push("/passenger/" + id);
  // };
  // inFlight = (id) => {
  //   this.props.history.push("/in-flight/" + id);
  // };
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
            <b>Departure:</b> {item.departure}
            <b>Arrival:</b> {item.arrival}
          </Typography>
        </CardContent>
        <Typography>
          <Button color="primary" onClick={() => this.flightDetail(item.id)}>
            Flight Detail
          </Button>
          <Button color="secondary">Check-In/Change Seat</Button>
          <Button color="primary">In-Flight</Button>
        </Typography>
      </Card>
    ));
  render() {
    return <Fragment>{this.renderCard()}</Fragment>;
  }
}

export default Flight;
