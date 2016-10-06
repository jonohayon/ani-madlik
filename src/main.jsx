import 'reset.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import Application from './components/app.jsx';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#F8333C',
    accent1Color: '#161925'
  }
});

const AppComponent = () =>
  <MuiThemeProvider muiTheme={muiTheme}>
    <Application />
  </MuiThemeProvider>;


ReactDOM.render(
  <AppComponent />,
  document.getElementById('app-container')
);
