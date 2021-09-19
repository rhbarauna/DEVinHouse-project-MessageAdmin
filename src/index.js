import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme} from '@material-ui/core';
import {ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  palette: {
    primary: {
      // #283347 , #374154 , #646c75 , #b0aeaa , #c2bfbb , #cccac7
      main: '#374154',
      contrastText: 'white'
    },
    secondary: {
      main: '#57dcbe',
      contrastText: 'white'
    },
    background: {
      app: '#28334780'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
