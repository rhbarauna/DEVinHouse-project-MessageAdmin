import {TRIGGER_ACTIONS_TYPE} from './actions';

const INITIAL_STATE = []

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  const {ADD, DEL, SET} = TRIGGER_ACTIONS_TYPE;

  switch(type) {
    case ADD:{
      return [
        ...state,
        payload
      ]
    }
    case DEL: {
      return state.filter(trigger => trigger.id !== payload.id)
    }
    case SET: {
      return payload
    }
    default: {
      return state;
    }
  }
}

export {
  reducer
}