const initialState = {
    countryDetails: []
}

import {
  GET_COUNTRY_DETAILS
} from '../actions/mainAction';

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case GET_COUNTRY_DETAILS:
      return {
        ...state,
        countryDetails: action.payload
      }
    default:
      return state;
  }
};

export default authReducer;
