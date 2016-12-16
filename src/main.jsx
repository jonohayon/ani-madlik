import 'reset.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Application from './components/app.jsx';

injectTapEventPlugin();

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
