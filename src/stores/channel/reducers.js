import { CHANNEL_ACTIONS_TYPE } from './actions';

const INITIAL_STATE = []

const reducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  const {ADD_CHANNEL, DEL_CHANNEL, SET_CHANNEL} = CHANNEL_ACTIONS_TYPE;

  switch(type) {
    case ADD_CHANNEL: {
      return [
        ...state,
        payload
      ]
    }
    case DEL_CHANNEL: {
      return state.filter(channel => channel.id !== payload.id)
    }
    case SET_CHANNEL: {
      return payload
    }
    default: {
      return state
    }
  }
}

export {
  reducer
}