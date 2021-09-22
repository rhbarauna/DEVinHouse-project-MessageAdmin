import { AUTH_ACTIONS } from "./actions";

const INITIAL_STATE = {
  loggedIn: true
};

const reducer = (state= INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch(type) {
    case AUTH_ACTIONS.LOGIN_ACTION: {
      return {
        ...state,
        loggedIn: true
      }
    }
    case AUTH_ACTIONS.LOGOUT_ACTION: {
      return {
        ...state,
        loggedIn: false
      }
    }
    default:
      return state
  }
} 

export {reducer}