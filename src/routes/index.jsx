import { Switch, Route, Redirect } from "react-router"
import {Dashboard as DashboardPage, Home as HomePage, Login as LoginPage} from '../pages';
import {Header} from '../components';
const ProtectedRoutes = () => {
  <Switch>
    <Route path='/' />
  </Switch>
}

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path='/login' component={LoginPage}/>
        <Route path='/'>
          <Header />
          <div className="container pageWrapper">
            <Switch>
              <Route path='/dashboard' component={DashboardPage}/>
              <Route path='/messages' component={HomePage}/>
              <Route exact path='/'>
                <Redirect to="/messages" />
              </Route>
            </Switch>
          </div>
        </Route>
      </Switch>
    </>
  )
}

export {
  Routes
}