import * as actionType from "../actions/action";
const initialState = {
  passenger: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_PASSENGER:
      return { ...state, passenger: action.payload };

    default:
      return state;
  }
};

export default reducer;
