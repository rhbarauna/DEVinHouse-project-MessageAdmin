import { createTheme } from "@material-ui/core";

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
      app: '#fffdf9'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export {
  theme
};