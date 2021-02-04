import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import classes from "./EditPassenger.module.scss";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const EditPassenger = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <Dialog
        disableBackdropClick
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
        fullWidth={true}
        maxWidth="xs"
        open={props.open}
        onClose={props.modalHandleClose}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle id="customized-dialog-title">
          Update Passenger
          <IconButton
            aria-label="close"
            className={classes.CloseButton}
            onClick={props.modalHandleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <form autoComplete="off">
            <div className={classes.Controlescontainer}>
              <FormControl>
                <TextField
                  id="standard-basic"
                  label="First Name"
                  value={props.passengerDetails.firstName}
                  onChange={(event) => props.handleUpdate(event, "firstName")}
                  {...(props.errors.firstName && {
                    error: true,
                    helperText: props.errors.firstName,
                  })}
                />
              </FormControl>
              <br></br>
              <br></br>
              <FormControl>
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  value={props.passengerDetails.lastName}
                  aria-describedby="my-helper-text"
                  onChange={(event) => props.handleUpdate(event, "lastName")}
                  {...(props.errors.lastName && {
                    error: true,
                    helperText: props.errors.lastName,
                  })}
                />
              </FormControl>
              <br></br>
              <br></br>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="DOB"
                  value={props.passengerDetails.DOB}
                  onChange={(event) => props.handleUpdate(event, "DOB")}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  {...(props.errors.DOB && {
                    error: true,
                    helperText: props.errors.DOB,
                  })}
                />
              </MuiPickersUtilsProvider>
            </div>
            <br></br>

            <div className={classes.Controlescontainer}>
              <FormControl
                component="fieldset"
                {...(props.errors.gender && {
                  error: true,
                })}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={props.passengerDetails.gender}
                  onChange={(event) => props.handleUpdate(event, "gender")}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
                <FormHelperText>{props.errors.gender}</FormHelperText>
              </FormControl>
              <br></br>

              <FormControl>
                <TextField
                  id="standard-basic"
                  label="Address"
                  value={props.passengerDetails.address}
                  aria-describedby="my-helper-text"
                  onChange={(event) => props.handleUpdate(event, "address")}
                  {...(props.errors.address && {
                    error: true,
                    helperText: props.errors.address,
                  })}
                />
              </FormControl>
              <br></br>
              <br></br>
              <FormControl>
                <TextField
                  id="standard-basic"
                  label="Contact"
                  value={props.passengerDetails.contact}
                  onChange={(event) => props.handleUpdate(event, "contact")}
                  {...(props.errors.contact && {
                    error: true,
                    helperText: props.errors.contact,
                  })}
                />
              </FormControl>
              <br></br>
              <br></br>
              <FormControl>
                <TextField
                  id="standard-basic"
                  label="Passport"
                  value={props.passengerDetails.passport}
                  onChange={(event) => props.handleUpdate(event, "passport")}
                  {...(props.errors.passport && {
                    error: true,
                    helperText: props.errors.passport,
                  })}
                />
              </FormControl>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => props.updatePassenger()}
            color="primary"
          >
            Submit
          </Button>
          <Button
            variant="contained"
            type="reset"
            onClick={() => props.resetForm()}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
});

export default EditPassenger;
