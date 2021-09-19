import {combineReducers, createStore} from 'redux';
import { reducer as channelReducer} from './channel/reducers';
import { reducer as triggerReducer} from './trigger/reducers';
import { reducer as authReducer} from './auth/reducers';

const appReducers = combineReducers({
  auth: authReducer,
  channels: channelReducer,
  triggers: triggerReducer
});

const store = createStore(appReducers);
export { store }