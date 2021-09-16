import {TRIGGER_ACTIONS_TYPE} from './actions';

const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  const {ADD, DEL} = TRIGGER_ACTIONS_TYPE;

  switch(type) {
    case ADD:{
      return {
        ...state,
        payload
      }
    }
    case DEL: {
      const filtered = state.filter(trigger => trigger.id !== payload.id)
      
      return {
        ...filtered
      }
    }
    default: {
      return state;
    }
  }
}

export {
  reducer
}