import { CHANNEL_ACTIONS_TYPE } from './actions';

const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action) => {
  const {type, payload} = action;

  switch(type) {
    case CHANNEL_ACTIONS_TYPE.ADD: {
      return {
        ...state,
        payload
      }
    }
    case CHANNEL_ACTIONS_TYPE.DEL: {
      const filtered = state.filter(channel => channel.id !== payload.id)
      
      return {
        ...filtered
      }
    }

    default: {
      return state
    }
  }
}

export {
  reducer
}