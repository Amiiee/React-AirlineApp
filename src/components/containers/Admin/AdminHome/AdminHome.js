import React, { Component, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { httpGet } from "../../../../utils/api/http-calls";
import classes from "./AdminHome.module.scss";

class AdminHome extends Component {
  state = {
    items: [],
  };
  componentDidMount() {
    httpGet("http://localhost:3000/flights").then((response) => {
      this.setState({ items: response.data });
    });
  }
  managePassenger = (id) => {
    this.props.history.push("/admin-operation/" + id);
  };

  manageAncillary = (id) => {
    this.props.history.push("/passenger/" + id);
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
            <b>Departure:</b> {item.departure}
            <span>&nbsp;</span>
            <b>Arrival:</b> {item.arrival}
          </Typography>
        </CardContent>
        <Typography>
          <Button color="primary" onClick={() => this.managePassenger(item.id)}>
            Manage Passenger
          </Button>
          <Button
            color="secondary"
            onClick={() => this.manageAncillary(item.id)}
          >
            Manage Ancillary Services
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

export default AdminHome;
