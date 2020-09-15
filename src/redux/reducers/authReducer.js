import {
  LOGGED_IN,
  LOGGED_OUT
} from '../actions/types';


const initialState = {
  user: {},
  auth: false,
  loaded: false,
};


export default (state = initialState, action) => {
  switch (action.type){
    case LOGGED_IN:
      return {
        ...state,
        auth: true,
        user: action.user,
        loaded: true,
      };

    case LOGGED_OUT:
      return {
        ...state,
        auth: false,
        loaded: true,
        user: {}
      }
    default:
      return state;
  }
}