import React, { Component } from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import GoogleMap from 'google-map-react';

import counter from '../stores/points.js';
import Marker from './marker.jsx';
import '../style/style.scss';

export default class Application extends Component {
  constructor () {
    super();
    this.state = { count: counter.getState() };
  }

  render () {
    const self = this;
    counter.subscribe(() => self.setState({ count: counter.getState() }));
    return (
      <div>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyDctiIt5ZAbPX1j_juITn2wfUWIlm-AAQ8' }}
          center={{ lat: 32.869622, lng: 35.249913 }}
          zoom={7}
          options={{
            rotateControl: false
          }}
        >
          <Marker lat={32.869622} lng={35.249913} />
        </GoogleMap>
        <FloatingActionButton className="fab">
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}
