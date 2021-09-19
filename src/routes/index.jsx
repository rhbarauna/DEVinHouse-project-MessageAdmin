import { Switch, Route, Redirect } from "react-router"
import {Dashboard as DashboardPage, Messages as MessagesPage, Login as LoginPage} from '../pages';
import {Header} from '../components';
import { useEffect } from "react";
import {useDispatch} from 'react-redux';
import { SET_CHANNELS } from "../stores/channel/actions";
import { SET_TRIGGERS } from "../stores/trigger/actions";
import {getTriggers, getChannels} from '../services/api';


const routes = [
  { path: '/messages', label: 'Mensagens'},
  { path: '/dashboard', label: 'Dashboard'},
  { path: '/login', label: 'Login'},
]

const Routes = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    ( async () => {
      const chs = await getChannels();
      const action = SET_CHANNELS(chs.data);
      dispatch(action);
    })();
  });

  useEffect(()=>{
    ( async () => {
      const trgs = await getTriggers();
      const action = SET_TRIGGERS(trgs.data);
      dispatch(action);
    })();
  });

  return (
    <>
      <Switch>
        <Route path='/login' component={LoginPage}/>
        <Route path='/'>
          <>
            <Header routes={routes}/>
            <div className="container pageWrapper">
              <Switch>
                <Route path='/dashboard' component={DashboardPage}/>
                <Route path='/messages' component={MessagesPage}/>
                <Route path='/' exact>
                  <Redirect to="/messages" />
                </Route>
              </Switch>
            </div>
          </>
        </Route>
      </Switch>
    </>
  )
}

export {
  Routes
}