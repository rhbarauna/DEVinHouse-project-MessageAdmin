import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import './mock/api';
import { makeStyles} from '@material-ui/core';
import { Provider } from 'react-redux';
import { store } from './stores';
import SnackbarProvider from './components/SnackbarProvider';

const useStyles = makeStyles((theme) => {
  return {
    App:{
      height: '100vh',
      backgroundColor: theme.palette.background.app,
    }
  }
});

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <div className={classes.App}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </div>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
