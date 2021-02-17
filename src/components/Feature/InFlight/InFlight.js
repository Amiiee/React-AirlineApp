import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { httpGet } from "../../../utils/api/http-calls";
import classes from "./InFlight.module.scss";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";

class InFlight extends Component {
  state = {
    seats: [
      { id: 1, seatNo: "A1" },
      { id: 2, seatNo: "A2" },
      { id: 3, seatNo: "A3" },
      { id: 4, seatNo: "A4" },
      { id: 5, seatNo: "A5" },
      { id: 6, seatNo: "A6" },
      { id: 7, seatNo: "A7" },
      { id: 8, seatNo: "A8" },
      { id: 9, seatNo: "A9" },
      { id: 10, seatNo: "A10" },
      { id: 11, seatNo: "A11" },
      { id: 12, seatNo: "A12" },
      { id: 13, seatNo: "A13" },
      { id: 14, seatNo: "A14" },
      { id: 15, seatNo: "A15" },
      { id: 16, seatNo: "A16" },
      { id: 17, seatNo: "A17" },
      { id: 18, seatNo: "A18" },
      { id: 19, seatNo: "A19" },
      { id: 20, seatNo: "A20" },
      { id: 21, seatNo: "A21" },
      { id: 22, seatNo: "A22" },
      { id: 23, seatNo: "A23" },
      { id: 24, seatNo: "A24" },
      { id: 25, seatNo: "A25" },
      { id: 26, seatNo: "A26" },
      { id: 27, seatNo: "A27" },
      { id: 28, seatNo: "A28" },
      { id: 29, seatNo: "A29" },
      { id: 30, seatNo: "A30" },
    ],
    mealColour: [
      { id: 1, text: "Veg", color: "lightgreen" },
      { id: 2, text: "Non Veg", color: "#ff8566" },
    ],
    passengers: [
      {
        id: 0,
        airlineId: 0,
        seatId: 0,
        checkIn: false,
        wheelChair: false,
        infant: false,
        firstName: "",
        lastName: "",
        DOB: "",
        gender: "",
        address: "",
        contact: "",
        passport: "",
        luggage: 0,
        food: "",
      },
    ],
    passenger: {
      id: 0,
      airlineId: 0,
      seatId: 0,
      checkIn: false,
      wheelChair: false,
      infant: false,
      firstName: "",
      lastName: "",
      DOB: "",
      gender: "",
      address: "",
      contact: "",
      passport: "",
      luggage: 0,
      food: "",
    },
    showPassenger: false,
    flightDetail: {
      id: 0,
      airline: "",
      from: "",
      to: "",
      departure: "",
      arrival: "",
    },
  };

  componentDidMount() {
    httpGet(
      "http://localhost:3000/flights?id=" + this.props.match.params.id
    ).then((response) => {
      this.setState({ flightDetail: response.data[0] });
    });
    this.getPassenger();
  }

  displayDetails = (id) => {};

  getMealColour = (id) => {
    let color = "#b3b3b3";
    this.state.passengers.forEach((item) => {
      if (item.seatId === id) {
        if (item.food === "Veg") color = "lightgreen";
        else if (item.food === "Non Veg") color = "#ff8566";
      }
    });
    return color;
  };
  getPassenger() {
    httpGet(
      "http://localhost:3000/passenger?airlineId=" + this.props.match.params.id
    ).then((response) => {
      this.setState({ passengers: response.data });
    });
  }

  displayDetails = (id) => {
    this.state.passengers.forEach((item) => {
      if (item.seatId === id) {
        this.setState({
          passenger: item,
          showPassenger: true,
        });
      }
    });
  };
  onEditPassenger = () => {
    this.props.history.push("/passenger/" + this.props.match.params.id);
  };
  render() {
    return (
      <Fragment>
        <div className="container">
          <h3>Flight Details</h3>
          {this.state.flightDetail.airline}
          <br></br>
          <br></br>
          {this.state.flightDetail.from} to {this.state.flightDetail.to}
          <br></br>
          <br></br>
          <b>Departure:</b>
          {moment(this.state.flightDetail.departure).format("LT")}
          <span>&nbsp;</span>
          <b>Arrival:</b> {moment(this.state.flightDetail.arrival).format("LT")}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-7">
                  <table>
                    <tbody>
                      <tr>
                        {this.state.mealColour.map((meal) => (
                          <td key={meal.id}>
                            <span
                              className={classes.SeatLabelBtn}
                              style={{ backgroundColor: meal.color }}
                            ></span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {this.state.mealColour.map((meal) => (
                          <td key={meal.id}>
                            <span>{meal.text}</span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="row">
                      {this.state.seats.map((seat) => (
                        <div
                          className="col-4 col-sm-4 col-md-4 col-lg-4"
                          key={seat.id}
                        >
                          <Tooltip title="click here">
                            <span>
                              <Button
                                className={classes.Seatbtn}
                                disabled={
                                  this.getMealColour(seat.id) === "#b3b3b3"
                                }
                                style={{
                                  backgroundColor: this.getMealColour(seat.id),
                                }}
                                onClick={() => this.displayDetails(seat.id)}
                              >
                                {seat.seatNo}
                              </Button>
                            </span>
                          </Tooltip>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {this.state.showPassenger ? (
                  <div className="col-md-5">
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          Passenger Details
                        </Typography>
                        <Typography variant="body2" component={"span"}>
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <b>PNR:</b>
                                </td>
                                <td>{this.state.passenger.id}</td>
                              </tr>
                              <tr>
                                <td>
                                  <b>First Name:</b>
                                </td>
                                <td>{this.state.passenger.firstName}</td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Last Name:</b>
                                </td>
                                <td>{this.state.passenger.lastName}</td>
                              </tr>
                              <tr>
                                <td>
                                  <b>DOB:</b>
                                </td>
                                <td>
                                  {moment(this.state.passenger.DOB).format(
                                    "DD-MM-YYYY"
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Gender:</b>
                                </td>
                                <td>{this.state.passenger.gender}</td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Address:</b>
                                </td>
                                <td>{this.state.passenger.address}</td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Passport:</b>
                                </td>
                                <td>{this.state.passenger.passport}</td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Luggage:</b>
                                </td>
                                <td>{this.state.passenger.luggage}</td>
                              </tr>
                              <tr>
                                <td>
                                  <b>Food Preference:</b>
                                </td>
                                <td>{this.state.passenger.food}</td>
                              </tr>
                            </tbody>
                          </table>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => this.onEditPassenger()}
                        >
                          Change/Add Meal Preference/Ancillary Service
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    flightDetails: state.flights.allFlightDetails,
  };
};
export default withRouter(connect(mapStateToProps)(InFlight));
