import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import './mock/api';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, makeStyles, Slide } from '@material-ui/core';
import { Provider } from 'react-redux';
import { store } from './stores';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({
  palette: {
    primary: {
      // #283347 , #374154 , #646c75 , #b0aeaa , #c2bfbb , #cccac7
      main: '#374154'
    },
    secondary: {
      main: '#646c75'
    },
    background: {
      main: '#b0aeaa'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const snackbarProps = {
  maxSnack:5,
  anchorOrigin:{
    vertical: 'top',
    horizontal: 'right',
  },
  autoHideDuration:3500,
  TransitionComponent:Slide
}

const useStyles = makeStyles((theme) => ({
  App:{
    backgroundColor: theme.palette.background.main
  }
}));

function App() {
const classes = useStyles();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider {...snackbarProps}>
          <div className={classes.App}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
