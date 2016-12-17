import React, { Component, PropTypes } from 'react';
import { Drawer, AppBar, IconButton, RaisedButton, TextField } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { strings } from '../strings.js';

export default class NDrawer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: props.open
    };
  }

  render () {
    return (
      <Drawer
        width={350}
        docked={false}
        open={this.state.open}
      >
        <AppBar
          title={strings.addPlace}
          className={'rtl'}
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        />
        <div className={'location-btn-cont'}>
          <TextField
            floatingLabelText={strings.floatingLabel}
            name={'address-input'}
            className={'rtl'}
          />
          <br />
          <RaisedButton
            label={strings.searchAddress}
            className={'location-btn'}
            secondary
          />
        </div>
      </Drawer>
    );
  }
}

NDrawer.propTypes = { open: PropTypes.bool.isRequired };
NDrawer.defaultProps = { open: false };
