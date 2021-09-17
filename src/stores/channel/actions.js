const CHANNEL_ACTIONS_TYPE = {
  ADD: 'ADD_CHANNEL',
  DEL: 'REMOVE_CHANNEL',
  SET: 'SET_CHANNELS',
}

const ADD_CHANNEL = (payload) => ({
  type: CHANNEL_ACTIONS_TYPE.ADD,
  payload
})

const SET_CHANNELS = (payload) => ({
  type: CHANNEL_ACTIONS_TYPE.SET,
  payload
})

const REMOVE_CHANNEL = (payload) => ({
  type: CHANNEL_ACTIONS_TYPE.REMOVE,
  payload
})

export {
  CHANNEL_ACTIONS_TYPE,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  SET_CHANNELS
}