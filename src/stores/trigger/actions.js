
const TRIGGER_ACTIONS_TYPE = {
  ADD: 'ADD_TRIGGER',
  DEL: 'REMOVE_TRIGGER',
  SET: 'SET_TRIGGERS',
}

const ADD_TRIGGER = (payload) => ({
 type: TRIGGER_ACTIONS_TYPE.ADD,
 payload
})

const DELETE_TRIGGER = (payload) => ({
  type: TRIGGER_ACTIONS_TYPE.DEL,
  payload
 })

 const SET_TRIGGERS = (payload) => ({
  type: TRIGGER_ACTIONS_TYPE.SET,
  payload
 })

export {
  TRIGGER_ACTIONS_TYPE,
  ADD_TRIGGER,
  DELETE_TRIGGER,
  SET_TRIGGERS
}