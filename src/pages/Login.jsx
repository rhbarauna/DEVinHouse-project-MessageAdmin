import { Container, makeStyles, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push('/');
  }

  return (
    <Paper>
      <Container className={classes.loginContainer}>
        <form className="loginForm" method='POST' action="#" onSubmit={handleSubmit}>
          <div className='inputWrapper'>
            <label for='login_inp'>Login</label>
            <input type="text" name='login' id='login_inp'/>
          </div>
          <div className='inputWrapper'>
            <label for='password_inp'>Password</label>
            <input type="password" name='password' id='password_inp'/>
          </div>
          <button type="submit"> Login </button>
        </form>
      </Container>
    </Paper>
  );
}
export default Login;