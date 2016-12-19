import React, { Component, PropTypes } from 'react';
import truncate from 'truncate';

import placeIcon from '../assets/place-icon.png';

export default class Marker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false,
      name: props.name
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle () { this.setState({ active: !this.state.active }); }

  render () {
    const className = this.state.active ? 'place-name active' : 'place-name';
    return (
      <div style={{ width: 32, height: 32, position: 'relative' }}>
        <div className={className}>{truncate(this.state.name, 18)}</div>
        <img
          src={placeIcon}
          style={{ height: '100%', fill: '#FF6700', cursor: 'pointer' }}
          alt={'מיקום'}
          onTouchTap={this.toggle}
        />
      </div>
    );
  }
}

Marker.propTypes = { name: PropTypes.string.isRequired };
