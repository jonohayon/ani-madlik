/* global gapiKey */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import GoogleMap from 'google-map-react';

import { ilPoint } from '../constants.js';
import Marker from './marker.jsx';
import SearchMarker from './searchMarker.jsx';
import NDrawer from './drawer.jsx';
import gmaps from '../stores/gmaps.js';

import '../style/style.scss';

export default class Application extends Component {
  constructor () {
    super();
    this.state = {
      open: false
    };

    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer () { this.setState({ open: true }); }

  render () {
    return (
      <div>
        <Helmet title='אני מדליק!' />
        <NDrawer open={this.state.open} />
        <GoogleMap
          bootstrapURLKeys={{ key: gapiKey, libraries: 'places', language: 'iw' }}
          onGoogleApiLoaded={({ map, maps }) => gmaps.dispatch({ type: 'READY', payload: { map, maps } })}
          yesIWantToUseGoogleMapApiInternals
          center={ilPoint}
          zoom={8}
        >
          <Marker lat={32.869622} lng={35.249913} i={10} />
        </GoogleMap>
        <FloatingActionButton className={'fab'} onTouchTap={this.openDrawer}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}
