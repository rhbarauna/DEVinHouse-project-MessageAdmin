import { Switch, Route, Redirect } from "react-router"
import {Dashboard as DashboardPage, Home as HomePage, Login as LoginPage} from '../pages';
import {Header} from '../components';

const ProtectedRoutes = () => {

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