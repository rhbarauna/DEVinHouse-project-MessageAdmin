import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import './mock/api';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { Provider } from 'react-redux';
import { store } from './stores';
const theme = createTheme({});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
