import * as actionType from "../actions/actionType";
const initialState = {
  passenger: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_PASSENGER:
      return { ...state, passenger: action.payload };

    case actionType.UPDATE_PASSENGER:
      return {
        ...state,
        updatedPassengerDetails: action.payload,
      };

    case actionType.DELETE_PASSENGER:
      return {
        ...state,
        deletedPassengerDetails: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
