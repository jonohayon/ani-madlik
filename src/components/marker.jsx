import React, { Component } from 'react';

import menorah from '../assets/menorah-icon.png';

export default class Marker extends Component {
  render () {
    return (
      <img src={menorah} width={24} height={24} alt={'Menorah'} />
    );
  }
}
