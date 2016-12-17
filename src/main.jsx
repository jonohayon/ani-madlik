import 'reset.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Application from './components/app.jsx';

injectTapEventPlugin(); // Inject dat tap event boiiii

const muiTheme = getMuiTheme({
  fontFamily: '"Heebo", sans-serif',
  palette: {
    primary1Color: '#F8333C',
    accent1Color: '#161925'
  },
  raisedButton: {
    secondaryColor: '#fff',
    secondaryTextColor: '#F8333C'
  },
  isRtl: true
});

const AppComponent = () =>
  <MuiThemeProvider muiTheme={muiTheme}>
    <Application />
  </MuiThemeProvider>;


ReactDOM.render(
  <AppComponent />,
  document.getElementById('app-container')
);
