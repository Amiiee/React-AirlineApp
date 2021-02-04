import { httpGet, httpPut, httpDelete } from "../../utils/api/http-calls";

export const FETCH_PASSENGER = "FETCH_PASSENGER ";
export const ADD_PASSENGER = "ADD_PASSENGER ";
export const ALL_FLIGHTS = "ALL_FLIGHTS ";
export const FLIGHT_DETAILS = "FLIGHT_DETAILS ";
export const UPDATE_PASSENGER = "UPDATE_PASSENGER ";
export const DELETE_PASSENGER = "DELETE_PASSENGER ";

export const allFlights = () => {
  return (dispatch) => {
    httpGet("http://localhost:3000/flights").then((getResponse) => {
      dispatch({
        type: ALL_FLIGHTS,
        payload: getResponse.data,
      });
    });
  };
};
export const flightDetails = (airlineNumber) => {
  return (dispatch) => {
    httpGet("http://localhost:3000/" + airlineNumber).then((getResponse) => {
      dispatch({
        type: FLIGHT_DETAILS,
        payload: getResponse.data,
      });
    });
  };
};
export const updatePassenger = (airlineNumber, passengerId) => {
  return (dispatch) => {
    httpPut("http://localhost:3000/" + airlineNumber + "/" + passengerId).then(
      (getResponse) => {
        dispatch({
          type: UPDATE_PASSENGER,
          payload: getResponse.data,
        });
      }
    );
  };
};
export const deletePassenger = (passengerId) => {
  return (dispatch) => {
    httpDelete("http://localhost:3000/" + passengerId).then((getResponse) => {
      dispatch({
        type: DELETE_PASSENGER,
        payload: getResponse.data,
      });
    });
  };
};
