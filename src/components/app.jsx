/* global gapiKey */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { FloatingActionButton } from 'material-ui';
import MapsAddLocation from 'material-ui/svg-icons/maps/add-location';
import GoogleMap from 'google-map-react';

import { ilPoint } from '../constants.js';
import Marker from './marker.jsx';
import NDrawer from './drawer.jsx';
import gmaps from '../stores/gmaps.js';
import locations from '../stores/locations.js';

import '../style/style.scss';

function createMapOptions () {
  return {
    styles: [{
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [{ visibility: 'off' }]
    }, {
      featureType: 'poi.business',
      stylers: [{ visibility: 'off' }]
    }, {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    }, {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }]
    }]
  };
}

export default class Application extends Component {
  constructor () {
    super();
    this.state = {
      open: false,
      locations: []
    };

    locations.subscribe(() => {
      const state = locations.getState();
      if (state.locations && Array.isArray(state.locations)) {
        this.setState({ locations: state.locations });
      }
    });
    locations.dispatch({ type: 'GET' });

    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer () { this.setState({ open: true }); }

  render () {
    return (
      <div>
        <Helmet title={'אני מדליק!'} />
        <NDrawer open={this.state.open} />
        <GoogleMap
          bootstrapURLKeys={{ key: keys.google, libraries: 'places', language: 'iw' }}
          onGoogleApiLoaded={({ map, maps }) => gmaps.dispatch({ type: 'READY', payload: { map, maps } })}
          yesIWantToUseGoogleMapApiInternals
          center={ilPoint}
          zoom={9}
          className={'gmap'}
          options={createMapOptions}
        >
          {this.state.locations.map(l =>
            <Marker lat={l.latitude} lng={l.longitude} name={l.name} />
          )}
        </GoogleMap>
        <FloatingActionButton className={'fab'} onTouchTap={this.openDrawer}>
          <MapsAddLocation />
        </FloatingActionButton>
      </div>
    );
  }
}
