import { Avatar, Backdrop, Box, Button, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { FormInputText } from '../components';
import {login} from "../stores/auth/actions";
import {LockOutlined} from '@material-ui/icons';
import { useState } from 'react';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: "/" } };
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true)
    setTimeout(()=>{
      const signIn = login({});
      dispatch(signIn);
      history.replace(from);
    }, 2000);
  }

  return (
    <Grid container component='main' style={{ height: '100vh' }}>
      <Grid item xs={false} sm={4} md={7}
        style={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <Box my={8} mx={4}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           <Avatar style={{ margin: '1px', backgrounColor: 'secondary' }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          <Box
            component="form"
            noValidate
            method='POST'
            mt={4}
            onSubmit={handleSubmit}>
              <FormInputText 
                id='login_inp'
                name='login'
                label='Usuário' 
                autoFocus
              />
              <FormInputText
                type='password'
                id='password_inp'
                name='password'
                label='Senha'
                autoComplete="current-password"
              />
              <Button
                type="Submit"
                color='secondary'
                fullWidth
                variant="contained"
                style={{ marginTop: 5}}
              >
                Login
              </Button>
          </Box>
          <Box mt={5}>
            <Typography variant='subtitle2'>
              Basta apertar no botao de login sem preencher nada
            </Typography>
          </Box>
        </Box>
        <Backdrop
          style={{ color: '#fff', zIndex: 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </Grid>
  );
}
export default Login;