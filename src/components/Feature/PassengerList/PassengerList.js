import { makeStyles } from "@material-ui/core/styles";
import React, { Component, Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { httpGet } from "../../../utils/api/http-calls";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import classes from "./PassengerList.module.scss";
import * as moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectroot: {
    display: "flex",
    flexWrap: "wrap",
    float: "right",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class PassengerList extends Component {
  classes = useStyles;
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
        food: "",
      },
    ],
    updatedPassengers: null,
    filter: "None",
  };

  componentDidMount() {
    httpGet(
      "http://localhost:3000/passenger?airlineId=" + this.props.match.params.id
    ).then((response) => {
      this.setState({
        passengers: response.data,
        updatedPassengers: response.data,
      });
    });
  }

  filterHandler = (event) => {
    let passengers = null;
    if (this.state.filter !== event.target.value) {
      if (event.target.value === "None") {
        passengers = this.state.passengers;
      } else if (event.target.value === "not checked in") {
        passengers = this.state.passengers.filter(
          (personDetails) => personDetails.checkIn === false
        );
      } else if (event.target.value === "wheel chair") {
        passengers = this.state.passengers.filter(
          (personDetails) => personDetails.wheelChair === true
        );
      } else if (event.target.value === "infant") {
        passengers = this.state.passengers.filter(
          (personDetails) => personDetails.infant === true
        );
      }

      this.setState({
        filter: event.target.value,
        updatedPassengers: passengers,
      });
    }
  };

  render() {
    return (
      <Fragment>
        <form className={classes.FilterForm} autoComplete="off">
          <FormControl className={this.classes.formControl}>
            <InputLabel variant="outlined">Filter By:</InputLabel>
            <Select
              value={this.state.filter}
              onChange={(event) => this.filterHandler(event)}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value={"not checked in"}>Not checked In</MenuItem>
              <MenuItem value={"wheel chair"}>Wheel chair passenger</MenuItem>
              <MenuItem value={"infant"}>passenger with infant</MenuItem>
            </Select>
          </FormControl>
        </form>
        {!this.state.updatedPassengers ? (
          <span>No results to display</span>
        ) : (
          <TableContainer component={Paper}>
            <Table className={this.classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">DOB</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Contact</TableCell>
                  <TableCell align="right">Seat No.</TableCell>
                  <TableCell align="right">Check-in</TableCell>
                  <TableCell align="right">Luggage</TableCell>
                  <TableCell align="right">Food Prefernce</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.updatedPassengers.map((passengerListItems) => (
                  <TableRow key={passengerListItems.id}>
                    <TableCell component="th" scope="row">
                      <span>{passengerListItems.firstName}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span>{passengerListItems.lastName}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span>
                        {passengerListItems.DOB
                          ? moment(passengerListItems.DOB).format("DD-MM-YYYY")
                          : "_"}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span>{passengerListItems.gender}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span>
                        {passengerListItems.address
                          ? passengerListItems.address
                          : "_"}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span>{passengerListItems.contact}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span>
                        {passengerListItems.seatId
                          ? "A" + passengerListItems.seatId
                          : "_"}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span>{passengerListItems.checkIn ? "Yes" : "No"}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span>
                        {passengerListItems.luggage
                          ? passengerListItems.luggage
                          : "_"}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span>
                        {passengerListItems.food
                          ? passengerListItems.food
                          : "_"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Fragment>
    );
  }
}
export default PassengerList;
