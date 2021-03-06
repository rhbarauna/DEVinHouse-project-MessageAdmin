const CHANNEL_ACTIONS_TYPE = {
  ADD_CHANNEL: 'ADD_CHANNEL',
  DEL_CHANNEL: 'REMOVE_CHANNEL',
  SET_CHANNEL: 'SET_CHANNELS',
}

const ADD_CHANNEL = (payload) => ({
  type: CHANNEL_ACTIONS_TYPE.ADD_CHANNEL,
  payload
})

const SET_CHANNELS = (payload) => ({
  type: CHANNEL_ACTIONS_TYPE.SET_CHANNEL,
  payload
})

const REMOVE_CHANNEL = (payload) => ({
  type: CHANNEL_ACTIONS_TYPE.REMOVE_CHANNEL,
  payload
})

export {
  CHANNEL_ACTIONS_TYPE,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  SET_CHANNELS
}