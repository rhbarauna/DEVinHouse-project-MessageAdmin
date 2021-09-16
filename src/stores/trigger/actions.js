
const TRIGGER_ACTIONS_TYPE = {
  ADD: 'ADD_TRIGGER',
  DEL: 'REMOVE_TRIGGER'
}

const ADD_TRIGER = (payload) => ({
 type: TRIGGER_ACTIONS_TYPE.ADD,
 payload
})

const DELETE_TRIGGER = (payload) => ({
  type: TRIGGER_ACTIONS_TYPE.DEL,
  payload
 })


export {
  TRIGGER_ACTIONS_TYPE,
  ADD_TRIGER,
  DELETE_TRIGGER
}