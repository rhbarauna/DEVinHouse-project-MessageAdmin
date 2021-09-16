import { Switch, Route, Redirect } from "react-router"
import {Dashboard as DashboardPage, Home as HomePage, Login as LoginPage} from '../pages';
import {Header} from '../components';
import { Snackbar } from "@material-ui/core";
import { useState } from "react";
const ProtectedRoutes = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState('');
  const handleCloseSnackbar = () => {}
  
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
        <Snackbar
          anchorOrigin={{ vertical:'top', horizontal:'top' }}
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          message={snackbarContent}
          key={Math.random()}
        />
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