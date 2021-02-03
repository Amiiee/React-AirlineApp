import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import classes from "./FlightDetail.module.scss";
import Button from "@material-ui/core/Button";
import { httpGet, httpPut } from "../../../utils/api/http-calls";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import * as actionType from "../../../store/actions/action";

class FlightDetail extends Component {
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
    colormaps: [
      { id: 1, text: "checked-in", color: "lightgreen" },
      { id: 2, text: "not checked-in", color: "#b3b3b3" },
      { id: 3, text: "wheel chair passenger", color: "lightpink" },
      { id: 4, text: "passengers with infants", color: "#DDBDF1" },
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
  };
  componentDidMount() {
    httpGet(
      "http://localhost:3000/passenger?airlineId=" + this.props.match.params.id
    ).then((response) => {
      this.setState({ passengers: response.data });
    });
  }
  renderSeatColor = () =>
    this.state.colormaps.map((item) => (
      <td key={item.id}>
        <span
          className={classes.SeatLabelBtn}
          style={{ backgroundColor: item.color }}
        ></span>
      </td>
    ));

  renderSeatLabel = () =>
    this.state.colormaps.map((item) => (
      <td key={item.id}>
        <span>{item.text}</span>
      </td>
    ));

  getColour = (status) => {
    let color = "#b3b3b3";
    this.state.passengers.forEach((item) => {
      if (item.seatId === status.id) {
        if (item.infant) {
          color = "#DDBDF1";
        } else if (item.wheelChair) {
          color = "lightpink";
        } else {
          color = "lightgreen";
        }
      }
    });
    return color;
  };

  displayDetails = (seat) => {
    this.state.passengers.forEach((item) => {
      if (item.seatId === seat.id) {
        this.setState({ passenger: item, showPassenger: true }, () =>
          this.props.addPassenger(this.state.passenger)
        );
      }
    });
  };

  renderSeat = () =>
    this.state.seats.map((item) => (
      <div className="col-4 col-sm-4 col-md-4 col-lg-4" key={item.id}>
        <button
          className={classes.SeatBtn}
          onClick={(event) => this.displayDetails(item)}
          disabled={this.getColour(item) === "#b3b3b3"}
          style={{ backgroundColor: this.getColour(item) }}
        >
          {item.seatNo}
        </button>
      </div>
    ));

  updatePassenger = () => {
    httpPut(
      "http://localhost:3000/passenger/" + this.state.passenger.id,
      this.state.passenger
    )
      .then((response) => {
        alert("Update sucessfull");
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  undoCheckIn = () => {
    const passenger = { ...this.state.passenger };
    passenger.checkIn = false;
    passenger.infant = false;
    passenger.wheelChair = false;
    passenger.food = null;
    passenger.luggage = null;
    passenger.seatId = null;
    this.setState(
      {
        passenger: passenger,
      },
      this.updatePassenger
    );
  };
  getAllPassengerDetails = () => {
    this.props.history.push("/passenger-list/" + this.props.match.params.id);
  };
  render() {
    let passenger = null;
    if (this.state.showPassenger) {
      passenger = (
        <div className="col-md-5">
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Passenger Details
              </Typography>
              <Typography component={"span"} variant={"body2"}>
                <table>
                  <thead>
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
                      <td>{this.state.passenger.DOB}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Gender:</b>
                      </td>
                      <td> {this.state.passenger.gender}</td>
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
                    <tr>
                      <td colSpan="2">
                        <Button
                          color="primary"
                          onClick={(event) => this.undoCheckIn()}
                        >
                          Undo Check-in
                        </Button>
                      </td>
                    </tr>
                  </thead>
                </table>
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }
    return (
      <Fragment>
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-7">
                  <div>
                    <Button
                      color="primary"
                      onClick={() => this.getAllPassengerDetails()}
                    >
                      Click here to see Passenger Details
                    </Button>
                  </div>
                  <table>
                    <thead>
                      <tr>{this.renderSeatColor()}</tr>
                      <tr>{this.renderSeatLabel()}</tr>
                    </thead>
                  </table>
                  <div className="container">
                    <div className="row">{this.renderSeat()}</div>
                  </div>
                </div>
                {passenger}
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
    showPassenger: state.passenger,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPassenger: (passenger) =>
      dispatch({ type: actionType.ADD_PASSENGER, payload: passenger }),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FlightDetail)
);
