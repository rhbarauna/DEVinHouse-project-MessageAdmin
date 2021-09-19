import { Container, makeStyles, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {login} from "../stores/auth/actions";

const useStyles = makeStyles((theme) => {
  return {
    loginContainer:{
      width: '500px',
      padding: theme.spacing(1),
      margin: 'auto',
      backgroundClor: theme.palette.background.main
    }
  }
})
const Login = () => {
  const classes= useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (event) => {
    event.preventDefault();
    const signIn = login({});
    dispatch(signIn);
    history.replace(from);
  }

  return (
    <Paper>
      <Container className={classes.loginContainer}>
        <form className="loginForm" method='POST' action="#" onSubmit={handleSubmit}>
          <div className='inputWrapper'>
            <label htmlFor='login_inp'>Login</label>
            <input type="text" name='login' id='login_inp'/>
          </div>
          <div className='inputWrapper'>
            <label htmlFor='password_inp'>Password</label>
            <input type="password" name='password' id='password_inp'/>
          </div>
          <button type="submit"> Login </button>
        </form>
      </Container>
    </Paper>
  );
}
export default Login;