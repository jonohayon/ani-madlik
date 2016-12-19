/* global google */
import React, { Component, PropTypes } from 'react';
import { Drawer, AppBar, IconButton, RaisedButton, TextField, MenuItem } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { ilPoint } from '../constants.js';
import { strings } from '../strings.js';

import gmaps from '../stores/gmaps.js';

const getPlaces = input => gmaps.dispatch({ type: 'SEARCH', payload: { input } })

export default class NDrawer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: props.open,
      query: '',
      preds: []
    };

    this.close = this.close.bind(this);
    this.search = this.search.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentWillReceiveProps (props) {
    if (this.state.open !== props.open) this.setState({ open: props.open });
  }

  onEnter (ev) { if (ev.keyCode === 13 && this.state.query) this.search() }
  close () { this.setState({ open: false, query: '', preds: [] }); }
  setQuery (ev) { this.setState({ query: ev.target.value }); }

  search () {
    const { query } = this.state;
    gmaps.subscribe(() => {
      const state = gmaps.getState()
      if (state.preds && Array.isArray(state.preds)) this.setState({ preds: state.preds })
    })
    getPlaces(query);
  }

  addLocation (geometry) {
    return () => {
      const { location } = geometry
      const lat = location.lat()
      const lng = location.lng()
    }
  }

  render () {
    const closeBtn = <IconButton onTouchTap={this.close}><NavigationClose /></IconButton>;
    const places = this.state.preds.map(p => {
      return (
        <MenuItem className={'place-info rtl'} onTouchTap={this.addLocation(p.geometry)}>
          <h1>{p.name}</h1>
          <h3>{p.formatted_address}</h3>
        </MenuItem>
      )
    })
    return (
      <Drawer
        width={350}
        docked={false}
        open={this.state.open}
        overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        <AppBar
          title={strings.addPlace}
          className={'rtl'}
          iconElementLeft={closeBtn}
        />
        <div className={'location-btn-cont'}>
          <TextField
            floatingLabelText={strings.floatingLabel}
            name={'address-input'}
            className={'rtl'}
            onChange={this.setQuery}
            onKeyPress={this.onEnter}
            value={this.state.query}
          />
          <br />
          <RaisedButton
            label={strings.searchAddress}
            className={'location-btn'}
            secondary
            onTouchTap={this.search}
          />
        </div>
        <br />
        {places}
      </Drawer>
    );
  }
}

NDrawer.propTypes = { open: PropTypes.bool.isRequired };
NDrawer.defaultProps = { open: false };
