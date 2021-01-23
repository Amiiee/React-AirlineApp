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
    selectedPassengerId: 0,
  };
  confirmDelete = () => {
    this.setState({
      modalOpen: true,
    });
  };

  modalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };
  componentDidMount() {
    httpGet(
      "http://localhost:3000/passenger?airlineId=" + this.props.match.params.id
    ).then((response) => {
      this.setState({
        passengers: response.data,
      });
    });
  }

  onEdit = (id) => {
    console.log(id);
  };
  onDelete = (id) => {
    console.log(id);
    this.setState({
      modalOpen: true,
      selectedPassengerId: id,
    });
  };
  modalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  deletePassenger = () => {
    httpDelete(
      "http://localhost:3000/passenger/" + this.state.selectedPassengerId
    )
      .then(() => {
        this.setState({
          modalOpen: false,
        });
        //window.location.reload(false);
        this.props.history.push(
          "/admin-operation/" + this.props.match.params.id
        );
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Table className={this.classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
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
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.passengers.map((passengerListItems) => (
                <TableRow key={passengerListItems.id}>
                  <TableCell component="th" scope="row">
                    {passengerListItems.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {passengerListItems.firstName}
                  </TableCell>
                  <TableCell align="right">
                    {passengerListItems.lastName}
                  </TableCell>
                  <TableCell align="right">{passengerListItems.DOB}</TableCell>
                  <TableCell align="right">
                    {passengerListItems.gender}
                  </TableCell>
                  <TableCell align="right">
                    {passengerListItems.address}
                  </TableCell>
                  <TableCell align="right">
                    {passengerListItems.contact}
                  </TableCell>
                  <TableCell align="right">
                    {passengerListItems.passport}
                  </TableCell>
                  <TableCell align="right">
                    {passengerListItems.checkIn}
                  </TableCell>
                  <TableCell align="right">
                    {passengerListItems.luggage}
                  </TableCell>
                  <TableCell align="right">{passengerListItems.food}</TableCell>
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
                      onClick={() => this.onEdit(passengerListItems.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }
}

export default AdminOperation;
