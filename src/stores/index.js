import {combineReducers, createStore} from 'redux';
import { reducer as channelReducer} from './channel/reducers';
import { reducer as triggerReducer} from './channel/reducers';

const appReducers = combineReducers({
  channel: channelReducer,
  trigger: triggerReducer
});

const store = createStore(appReducers);

export { store }