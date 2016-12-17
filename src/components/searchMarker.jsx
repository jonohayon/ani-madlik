import React, { Component, PropTypes } from 'react';

export default class SearchMarker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: props.i
    };
  }
  render () {
    return (
      <div className={'search-marker'}>
        {this.state.text}
      </div>
    );
  }
}

SearchMarker.propTypes = { i: PropTypes.number };
SearchMarker.defaultProps = { i: 1 };
