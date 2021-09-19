import { Switch, Route } from "react-router"
import {Dashboard as DashboardPage, Messages as MessagesPage, Login as LoginPage} from '../pages';
import {Header} from '../components';
import PrivateRoutes from "./PrivateRoutes";

const routes = [
  { path: '/messages', label: 'Mensagens'},
  { path: '/dashboard', label: 'Dashboard'},
]

const Routes = () => {

  return (
    <>
      <Switch>
        <Route path='/login' component={LoginPage}/>
        <PrivateRoutes path='/'>
          <>
            <Header routes={routes}/>
            <div className="container pageWrapper">
              <Switch>
                <Route path='/dashboard' component={DashboardPage}/>
                <Route path='/messages' component={MessagesPage}/>
                <Route path='/' render={()=><></>} exact />
              </Switch>
            </div>
          </>
        </PrivateRoutes>
      </Switch>
    </>
  )
}

export {
  Routes
}