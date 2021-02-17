import React, { Component, Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import LaunchIcon from "@material-ui/icons/Launch";
import { httpGet, httpDelete } from "../../../../utils/api/http-calls";
import Modal from "../../../../components/Shared/Modal/Modal";
import EditPassenger from "../EditPassenger/EditPassenger";
import { httpPut, httpPost } from "../../../../utils/api/http-calls";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AddPassenger from "../AddPassenger/AddPassenger";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import classes from "./AdminOperation.module.scss";
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

const initialState = (airlineId) => ({
  id: 0,
  airlineId: airlineId,
  seatId: null,
  checkIn: false,
  wheelChair: false,
  infant: false,
  firstName: "",
  lastName: "",
  DOB: null,
  gender: "",
  address: "",
  contact: "",
  passport: "",
  luggage: 0,
  food: "",
});

class AdminOperation extends Component {
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
    modalOpen: false,
    editModalOpen: false,
    addModalOpen: false,
    slectedPassengerId: 0,
    selectedPassengerDetails: initialState(this.props.match.params.id),
    errors: {},
    updatedPassengers: null,
    filter: "None",
  };
  myRef = React.createRef();
  getAllPassenger() {
    httpGet(
      "http://localhost:3000/passenger?airlineId=" + this.props.match.params.id
    ).then((response) => {
      this.setState({
        passengers: response.data,
        updatedPassengers: response.data,
      });
    });
  }
  componentDidMount() {
    this.getAllPassenger();
  }

  onEdit = (passengerDetails) => {
    this.setState({
      selectedPassengerDetails: passengerDetails,
      editModalOpen: true,
      errors: {},
    });
  };

  addNew = () => {
    this.setState({
      selectedPassengerDetails: initialState(this.props.match.params.id),
      addModalOpen: true,
      errors: {},
    });
  };

  resetForm = () => {
    const passenger = initialState(this.props.match.params.id);
    passenger.id = this.state.selectedPassengerDetails.id;
    this.setState({
      selectedPassengerDetails: passenger,
    });
  };
  handleUpdate = (event, field) => {
    if (field === "firstName") {
      this.setState({
        selectedPassengerDetails: {
          ...this.state.selectedPassengerDetails,
          firstName: event.target.value,
        },
      });
    } else if (field === "lastName") {
      this.setState({
        selectedPassengerDetails: {
          ...this.state.selectedPassengerDetails,
          lastName: event.target.value,
        },
      });
    } else if (field === "DOB") {
      this.setState({
        selectedPassengerDetails: {
          ...this.state.selectedPassengerDetails,
          DOB: event,
        },
      });
    } else if (field === "gender") {
      this.setState({
        selectedPassengerDetails: {
          ...this.state.selectedPassengerDetails,
          gender: event.target.value,
        },
      });
    } else if (field === "address") {
      this.setState({
        selectedPassengerDetails: {
          ...this.state.selectedPassengerDetails,
          address: event.target.value,
        },
      });
    } else if (field === "contact") {
      this.setState({
        selectedPassengerDetails: {
          ...this.state.selectedPassengerDetails,
          contact: event.target.value,
        },
      });
    } else if (field === "passport") {
      this.setState({
        selectedPassengerDetails: {
          ...this.state.selectedPassengerDetails,
          passport: event.target.value,
        },
      });
    }
  };
  onDelete = (id) => {
    this.setState({
      modalOpen: true,
      selectedPassengerId: id,
    });
  };
  modalClose = () => {
    this.setState({
      modalOpen: false,
      editModalOpen: false,
      addModalOpen: false,
    });
  };

  validate = () => {
    let temp = {};
    temp.firstName = this.state.selectedPassengerDetails.firstName
      ? ""
      : "This field is mandatory";
    temp.lastName = this.state.selectedPassengerDetails.lastName
      ? ""
      : "This field is mandatory";
    temp.contact =
      this.state.selectedPassengerDetails.contact.toString().length === 10
        ? ""
        : "Enter valid phone number";
    temp.gender = this.state.selectedPassengerDetails.gender
      ? ""
      : "Please select gender";

    this.setState({ errors: temp });

    return Object.values(temp).every((x) => x === "");
  };

  updatePassenger = () => {
    if (this.validate()) {
      httpPut(
        "http://localhost:3000/passenger/" +
          this.state.selectedPassengerDetails.id,
        this.state.selectedPassengerDetails
      )
        .then((response) => {
          alert("Update successfull");
          this.modalClose();
          this.getAllPassenger();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  addPassenger = () => {
    if (this.validate()) {
      httpPost(
        "http://localhost:3000/passenger/",
        this.state.selectedPassengerDetails
      )
        .then((response) => {
          alert("Passenger added successfully");
          this.modalClose();
          this.getAllPassenger();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  deletePassenger = () => {
    httpDelete(
      "http://localhost:3000/passenger/" + this.state.selectedPassengerId
    )
      .then(() => {
        this.setState({
          modalOpen: false,
        });
        this.getAllPassenger();
      })
      .catch((error) => console.log(error));
  };

  filterHandler = (event) => {
    let passengers = null;
    if (this.state.filter !== event.target.value) {
      if (event.target.value === "None") {
        passengers = this.state.passengers;
      } else if (event.target.value === "passport") {
        passengers = this.state.passengers.filter(
          (personDetails) => personDetails.passport === ""
        );
      } else if (event.target.value === "address") {
        passengers = this.state.passengers.filter(
          (personDetails) => personDetails.address === ""
        );
      } else if (event.target.value === "DOB") {
        passengers = this.state.passengers.filter(
          (personDetails) => !personDetails.DOB || personDetails.DOB === ""
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
        <Button
          variant="contained"
          style={{ backgroundColor: "white" }}
          className={classes.AddButton}
          onClick={() => this.addNew()}
        >
          <AddIcon></AddIcon>Create
        </Button>
        <AddPassenger
          ref={this.myRef}
          open={this.state.addModalOpen}
          handleUpdate={(event, field) => this.handleUpdate(event, field)}
          addPassenger={this.addPassenger}
          passengerDetails={this.state.selectedPassengerDetails}
          modalHandleClose={this.modalClose}
          resetForm={this.resetForm}
          errors={this.state.errors}
        ></AddPassenger>
        <form className={classes.AddButton} autoComplete="off">
          <FormControl className={this.classes.formControl}>
            <InputLabel variant="outlined">Filter By:</InputLabel>
            <Select
              value={this.state.filter}
              onChange={(event) => this.filterHandler(event)}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value={"passport"}>Passport</MenuItem>
              <MenuItem value={"address"}>Address</MenuItem>
              <MenuItem value={"DOB"}>DOB</MenuItem>
            </Select>
          </FormControl>
        </form>
        {!this.state.updatedPassengers ||
        this.state.updatedPassengers.length === 0 ? (
          <div>
            <br></br>
            <span>No results to display</span>
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table className={this.classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>PNR</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">DOB</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Contact</TableCell>
                  <TableCell align="right">Passport</TableCell>
                  <TableCell align="right">Check-in</TableCell>
                  <TableCell align="right">Luggage</TableCell>
                  <TableCell align="right">Food Prefernce</TableCell>
                  <TableCell align="right">Seat No.</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.updatedPassengers.map((passengerListItems) => (
                  <TableRow key={passengerListItems.id}>
                    <TableCell component="th" scope="row">
                      <span>{passengerListItems.id}</span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <span>{passengerListItems.firstName}</span>
                    </TableCell>
                    <TableCell align="right">
                      <span> {passengerListItems.lastName}</span>
                    </TableCell>
                    <TableCell align="right">
                      {passengerListItems.DOB
                        ? moment(passengerListItems.DOB).format("DD-MM-YYYY")
                        : "_"}
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
                        {passengerListItems.passport
                          ? passengerListItems.passport
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
                      {passengerListItems.food ? passengerListItems.food : "_"}
                    </TableCell>
                    <TableCell align="right">
                      {passengerListItems.seatId
                        ? "A" + passengerListItems.seatId
                        : "_"}
                    </TableCell>
                    <TableCell align="right">
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => this.onDelete(passengerListItems.id)}
                      />
                      <Modal
                        open={this.state.modalOpen}
                        deletePassenger={() => this.deletePassenger()}
                        modalHandleClose={this.modalClose}
                      ></Modal>
                    </TableCell>
                    <TableCell align="right">
                      <LaunchIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => this.onEdit(passengerListItems)}
                      />
                    </TableCell>
                    <EditPassenger
                      ref={this.myRef}
                      open={this.state.editModalOpen}
                      passengerDetails={this.state.selectedPassengerDetails}
                      handleUpdate={(event, field) =>
                        this.handleUpdate(event, field)
                      }
                      updatePassenger={this.updatePassenger}
                      modalHandleClose={this.modalClose}
                      errors={this.state.errors}
                      resetForm={this.resetForm}
                    ></EditPassenger>
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

export default AdminOperation;
