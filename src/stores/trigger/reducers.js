import {TRIGGER_ACTIONS_TYPE} from './actions';

const INITIAL_STATE = []

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  const {ADD_TRIGGER, DEL_TRIGGER, SET_TRIGGERS} = TRIGGER_ACTIONS_TYPE;

  switch(type) {
    case ADD_TRIGGER:{
      return [
        ...state,
        payload
      ]
    }
    case DEL_TRIGGER: {
      return state.filter(trigger => trigger.id !== payload.id)
    }
    case SET_TRIGGERS: {
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