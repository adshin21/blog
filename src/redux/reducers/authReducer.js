import {
  LOGGED_IN,
  LOGGED_OUT
} from '../actions/types';


const initialState = {
  user: {},
  auth: false,
  loading: false,
};


export default (state = initialState, action) => {
  switch (action.type){
    case LOGGED_IN:
      return {
        ...state,
        auth: true,
        user: action.user,
        loading: true,
      };

    case LOGGED_OUT:
      return {
        ...state,
        auth: false,
        loading: true,
        user: {}
      }
    default:
      return state;
  }
}