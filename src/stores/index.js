import {combineReducers, createStore} from 'redux';
import { reducer as channelReducer} from './channel/reducers';
import { reducer as triggerReducer} from './channel/reducers';

const appReducers = combineReducers({
  channels: channelReducer,
  triggers: triggerReducer
});

const store = createStore(appReducers);

export { store }