import {combineReducers, createStore} from 'redux';
import { reducer as channelReducer} from './channel/reducers';
import { reducer as triggerReducer} from './trigger/reducers';

const appReducers = combineReducers({
  channels: channelReducer,
  triggers: triggerReducer
});

const store = createStore(appReducers);
store.subscribe(()=> console.log(store.getState()));
export { store }