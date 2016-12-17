import React, { Component } from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import GoogleMap from 'google-map-react';

import Marker from './marker.jsx';
import SearchMarker from './searchMarker.jsx';
import NDrawer from './drawer.jsx';

import '../style/style.scss';

export default class Application extends Component {
  render () {
    const drawer = <NDrawer />;
    return (
      <div>
        {drawer}
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyDctiIt5ZAbPX1j_juITn2wfUWIlm-AAQ8' }}
          center={{ lat: 32.869622, lng: 35.249913 }}
          zoom={7}
          options={{
            rotateControl: false
          }}
        >
          <SearchMarker lat={32.869622} lng={35.249913} />
        </GoogleMap>
        <FloatingActionButton className={'fab'}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}
