/* global google */
import React, { Component, PropTypes } from 'react';
import { Drawer, AppBar, IconButton, RaisedButton, TextField, MenuItem, Dialog, FlatButton } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { strings } from '../strings.js';

import gmaps from '../stores/gmaps.js';
import locations from '../stores/locations.js';

const getPlaces = input => gmaps.dispatch({ type: 'SEARCH', payload: { input } });

export default class NDrawer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: props.open,
      query: '',
      preds: [],
      modalOpen: false,
      selected: {},
      selectedName: ''
    };

    this.close = this.close.bind(this);
    this.search = this.search.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps (props) {
    if (this.state.open !== props.open) this.setState({ open: props.open });
  }

  onEnter (ev) { if (ev.key === 'Enter' && this.state.query) this.search(); }
  setQuery (ev) { this.setState({ query: ev.target.value }); }
  close () { this.setState({ open: false, query: '', preds: [], modalOpen: false, selected: {}, selectedName: '' }); }
  closeModal () { this.setState({ selected: {}, selectedName: '', modalOpen: false }); }

  search () {
    const { query } = this.state;
    gmaps.subscribe(() => {
      const state = gmaps.getState();
      if (state.preds && Array.isArray(state.preds)) this.setState({ preds: state.preds });
    });
    getPlaces(query);
  }

  openModal (geometry) {
    return () => {
      const { location } = geometry;
      const lat = location.lat();
      const lng = location.lng();
      this.setState({ selected: { lat, lng }, modalOpen: true });
    };
  }

  addLocation () {
    const { selected, selectedName } = this.state;
    const { lat, lng } = selected;
    locations.dispatch({ type: 'ADD', payload: { lat, lng, name: selectedName } });
    this.close();
  }

  render () {
    const actions = [
      <FlatButton
        label={strings.cancel}
        primary
        onTouchTap={this.closeModal}
        style={{ marginRight: 5 }}
      />,
      <FlatButton
        label={strings.add}
        primary
        keyboardFocused
        onTouchTap={this.addLocation}
      />
    ];

    return (
      <Drawer
        width={350}
        docked={false}
        open={this.state.open}
        overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        <Dialog
          title={strings.addPlaceModal}
          modal={false}
          actions={actions}
          open={this.state.modalOpen}
          onRequestClose={this.close}
          className={'rtl'}
        >
          <TextField
            floatingLabelText={strings.addPlaceInput}
            name={'name-input'}
            className={'rtl'}
            onChange={ev => this.setState({ selectedName: ev.target.value })} // Ain't nobody got time for that
          />
        </Dialog>
        <AppBar
          title={strings.addPlace}
          className={'rtl'}
          iconElementLeft={<IconButton onTouchTap={this.close}><NavigationClose /></IconButton>}
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
        {this.state.preds.map(p =>
          <MenuItem className={'place-info rtl'} onTouchTap={this.openModal(p.geometry)}>
            <h1>{p.name}</h1>
            <h3>{p.formatted_address}</h3>
          </MenuItem>
        )}
      </Drawer>
    );
  }
}

NDrawer.propTypes = { open: PropTypes.bool.isRequired };
NDrawer.defaultProps = { open: false };
