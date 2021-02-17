import { httpGet, httpPut, httpDelete } from "../../utils/api/http-calls";
import * as actionType from "./actionType";

export const allFlights = () => {
  return (dispatch) => {
    httpGet("http://localhost:3000/flights").then((getResponse) => {
      dispatch({
        type: actionType.ALL_FLIGHTS,
        payload: getResponse.data,
      });
    });
  };
};
export const flightDetails = (airlineNumber) => {
  return (dispatch) => {
    httpGet("http://localhost:3000/" + airlineNumber).then((getResponse) => {
      dispatch({
        type: actionType.FLIGHT_DETAILS,
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
          type: actionType.UPDATE_PASSENGER,
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
        type: actionType.DELETE_PASSENGER,
        payload: getResponse.data,
      });
    });
  };
};
