import { Switch, Route, Redirect } from "react-router"
import {Dashboard as DashboardPage, Home as HomePage, Login as LoginPage} from '../pages';
import {Header} from '../components';
import { useEffect } from "react";
import {useDispatch} from 'react-redux';
import { SET_CHANNELS } from "../stores/channel/actions";
import { SET_TRIGGERS } from "../stores/trigger/actions";

const ProtectedRoutes = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    ( async () => {
      const response = await fetch('api/channels');
      const chs = await response.json();
      dispatch(SET_CHANNELS(chs));
    })();
  }, []);

  useEffect(()=>{
    ( async () => {
      const response = await fetch('api/triggers');
      const trgs = await response.json();
      dispatch(SET_TRIGGERS(trgs));
    })();
  }, []);

  return (
    <>
     <Header />
      <div className="container pageWrapper">
        <Switch>
          <Route path='/dashboard' component={DashboardPage}/>
          <Route path='/messages' component={HomePage}/>
          <Route path='/' exact>
            <Redirect to="/messages" />
          </Route>
        </Switch>
      </div>
    </>
  )
}

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path='/login' component={LoginPage}/>
        <Route path='/'>
          <ProtectedRoutes />          
        </Route>
      </Switch>
    </>
  )
}

export {
  Routes
}