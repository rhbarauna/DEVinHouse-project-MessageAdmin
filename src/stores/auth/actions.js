const AUTH_ACTIONS = {
  LOGIN_ACTION: 'LOGIN',
  LOGOUT_ACTION: 'LOGOUT'
}

const login = (payload) => {
  return {
    type: AUTH_ACTIONS.LOGIN_ACTION,
    payload
  }
}

const logout = (payload) => {
  return {
    type: AUTH_ACTIONS.LOGIN_ACTION,
    payload
  }
}

export {
  AUTH_ACTIONS,
  login,
  logout
}