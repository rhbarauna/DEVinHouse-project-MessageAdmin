import { Switch, Route } from "react-router"
import {Dashboard as DashboardPage, Messages as MessagesPage, Login as LoginPage} from '../pages';
import {Drawer, Header} from '../components';
import PrivateRoutes from "./PrivateRoutes";
import { Box, Toolbar } from "@material-ui/core";

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
          <Header/>
          <Box display='flex'>
            <Drawer routes={routes} />
            <Box component="main" flexGrow={1} p={3}>
            <Toolbar />
            <Switch>
              <Route path='/dashboard' component={DashboardPage}/>
              <Route path='/messages' component={MessagesPage}/>
              <Route path='/' render={()=><></>} exact />
            </Switch>
            </Box>
          </Box>
        </PrivateRoutes>
      </Switch>
    </>
  )
}

export {
  Routes
}