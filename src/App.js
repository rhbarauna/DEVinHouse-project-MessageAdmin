import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import './mock/api';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme, Slide } from '@material-ui/core';
import { Provider } from 'react-redux';
import { store } from './stores';
import { SnackbarProvider } from 'notistack';
const theme = createTheme({});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={5}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={3500}
          TransitionComponent={Slide}
        >
          <div className="App">
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
