import React, { Component, Fragment } from "react";
import classes from "./Passenger.module.scss";
import { InputLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { httpGet, httpPut } from "../../../utils/api/http-calls";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class Passenger extends Component {
  state = {
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
        food: null,
      },
    ],
    showSeat: false,
    pnr: "",
    passenger: null,
    noData: false,
    selectedSeat: null,
    foodType: null,
    luggageType: null,
    requirementType: "",
    bool: false,
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
  };

  handleChange = (event, field) => {
    if (field === "pnr") {
      this.setState({
        pnr: event.target.value,
      });
    }
    if (field === "passengerPreference") {
      this.setState({
        requirementType: event.target.value,
      });
    }
    if (field === "foodPreference") {
      this.setState({
        foodType: event.target.value,
      });
    }
    if (field === "luggagePreference") {
      this.setState({
        luggageType: event.target.value,
      });
    }
  };

  getPassenger() {
    httpGet(
      "http://localhost:3000/passenger?airlineId=" + this.props.match.params.id
    ).then((response) => {
      this.setState({ passengers: response.data });
    });
  }
  search = () => {
    this.setState({
      selectedSeat: null,
      foodType: null,
      luggageType: null,
      requirementType: "",
    });
    httpGet(
      "http://localhost:3000/passenger?airlineId=" +
        this.props.match.params.id +
        "&id=" +
        this.state.pnr
    ).then((resp) => {
      console.log(resp);
      this.setState({
        passenger: resp.data[0],
      });
      if (this.state.passenger === undefined) {
        this.setState({
          noData: true,
        });
      } else {
        this.setState({
          noData: false,
          selectedSeat: this.state.passenger.seatId,
          foodType: this.state.passenger.food,
          luggageType: this.state.passenger.luggage
            ? this.state.passenger.luggage.toString()
            : this.state.passenger.luggage,
        });
        if (this.state.passenger.wheelChair === true) {
          this.setState({
            requirementType: "wheel chair",
          });
        }

        if (this.state.passenger.infant === true) {
          this.setState({
            requirementType: "with infants",
          });
        }
        this.setState({
          showSeat: true,
        });
        this.getPassenger();
      }
    });
  };

  getColour = (status) => {
    let color = "lightgreen";
    this.state.passengers.forEach((item) => {
      if (item.seatId === status.id) {
        color = "gray";
      }
    });
    return color;
  };

  httpcall = () => {
    httpPut(
      "http://localhost:3000/passenger/" + this.state.passenger.id,
      this.state.passenger
    )
      .then((response) => {
        alert("Update successfull");
        if (localStorage.getItem("isAdmin") === "true") {
          this.props.history.push("/admin-home");
        } else {
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSubmit = () => {
    this.setState(
      {
        passenger: {
          ...this.state.passenger,
          checkIn: true,
          food: this.state.foodType,
          infant: this.state.requirementType === "wheel chair" ? false : true,
          luggage: this.state.luggageType,
          seatId: this.state.selectedSeat,
          wheelChair:
            this.state.requirementType === "wheel chair" ? true : false,
        },
      },
      this.httpcall
    );
  };

  onClickSeat = (id) => {
    this.setState({
      selectedSeat: id,
    });
  };
  render() {
    return (
      <Fragment>
        <div className={classes.Searchcontainer}>
          <table>
            <tbody>
              <tr>
                <td>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    <b>Enter PNR</b>
                  </InputLabel>
                </td>
                <td>
                  <TextField
                    id="standard-basic"
                    onChange={(event) => this.handleChange(event, "pnr")}
                    label="PNR"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {this.state.noData ? (
                    <InputLabel
                      style={{ color: "red" }}
                      htmlFor="input-with-icon-adornment"
                    >
                      passenger not found
                    </InputLabel>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            variant="contained"
            disabled={this.state.pnr === ""}
            onClick={() => this.search()}
          >
            <SearchIcon></SearchIcon>
            Search
          </Button>
        </div>
        {this.state.showSeat ? (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-7">
                    <span>
                      <b>Name: </b>
                      {this.state.passenger.firstName}{" "}
                      {this.state.passenger.lastName}
                    </span>
                    <br></br>
                    <h3>
                      Select Seat:
                      <span style={{ color: "blueviolet" }}>
                        A{this.state.selectedSeat}
                      </span>
                    </h3>
                    <div className="row">
                      {this.state.seats.map((seat) => (
                        <div
                          className="col-4 col-sm-4 col-md-4 col-lg-4"
                          key={seat.id}
                        >
                          <Button
                            className={classes.Btn}
                            disabled={this.getColour(seat) === "gray"}
                            style={{ backgroundColor: this.getColour(seat) }}
                            onClick={() => this.onClickSeat(seat.id)}
                          >
                            {seat.seatNo}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <h4>Choose Preference</h4>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="preference"
                        name="preference1"
                        value={this.state.requirementType}
                        onChange={(event) =>
                          this.handleChange(event, "passengerPreference")
                        }
                      >
                        <FormControlLabel
                          value="wheel chair"
                          control={<Radio />}
                          label="wheel chair"
                        />
                        <FormControlLabel
                          value="with infants"
                          control={<Radio />}
                          label="with infants"
                        />
                      </RadioGroup>
                    </FormControl>
                    <h3>Ancillary Services</h3>
                    <FormControl
                      component="fieldset"
                      style={{ marginLeft: "-30px" }}
                    >
                      <FormLabel component="legend">
                        Select Your food Preference
                      </FormLabel>
                      <RadioGroup
                        aria-label="foodPreference"
                        name="foodPreference1"
                        value={this.state.foodType}
                        onChange={(event) =>
                          this.handleChange(event, "foodPreference")
                        }
                      >
                        <FormControlLabel
                          value="Veg"
                          control={<Radio />}
                          label="Veg"
                        />
                        <FormControlLabel
                          value="Non Veg"
                          control={<Radio />}
                          label="Non Veg"
                        />
                      </RadioGroup>
                    </FormControl>
                    <br></br>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        Select Your luggauge Preference
                      </FormLabel>
                      <RadioGroup
                        aria-label="luggagePreference"
                        name="luggagePreference1"
                        value={this.state.luggageType}
                        onChange={(event) =>
                          this.handleChange(event, "luggagePreference")
                        }
                      >
                        <FormControlLabel
                          value="15"
                          control={<Radio />}
                          label="15"
                        />
                        <FormControlLabel
                          value="25"
                          control={<Radio />}
                          label="25"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.onSubmit()}
                disabled={
                  this.state.foodType === null ||
                  this.state.selectedSeat === null ||
                  this.state.luggageType === null ||
                  this.state.requirementType === ""
                }
              >
                Submit
              </Button>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default Passenger;
