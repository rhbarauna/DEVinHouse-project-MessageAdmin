import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { FormInputText } from '../components';
import {login} from "../stores/auth/actions";

const Login = () => {
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
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={4} md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="form"
            noValidate
            method='POST'
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}>
              <FormInputText 
                id='login_inp'
                name='login'
                label='Usuário' 
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
                sx={{ mt: 3, mb: 2 }}
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
      </Grid>
    </Grid>
  );
}
export default Login;