import * as actionType from "../actions/actionType";
const initialState = {
  flightDetails: {
    id: 0,
    airline: "",
    from: "",
    to: "",
    departure: "",
    arrival: "",
  },
  allFlightDetails: [
    {
      id: 0,
      airline: "",
      from: "",
      to: "",
      departure: "",
      arrival: "",
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ALL_FLIGHTS:
      return {
        ...state,
        flightDetails: action.payload,
      };

    case actionType.FLIGHT_DETAILS:
      return {
        ...state,
        allFlightDetails: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
