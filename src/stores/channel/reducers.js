import { CHANNEL_ACTIONS_TYPE } from './actions';

const INITIAL_STATE = []

const reducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  const {ADD, DEL, SET} = CHANNEL_ACTIONS_TYPE;

  switch(type) {
    case SET: {
      return payload
    }
    case ADD: {
      return [
        ...state,
        payload
      ]
    }
    case DEL: {
      return state.filter(channel => channel.id !== payload.id)
    }

    default: {
      return state
    }
  }
}

export {
  reducer
}