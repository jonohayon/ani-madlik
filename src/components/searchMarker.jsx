import React, { Component, PropTypes } from 'react';

export default class SearchMarker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: props.i,
      selected: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { text, selected } = this.state;
    this.setState({ text, selected: !selected });
  }

  render () {
    return (
      <div className={this.state.selected ? 'search-marker active' : 'search-marker'} onTouchTap={this.onClick}>
        {this.state.text}
      </div>
    );
  }
}

SearchMarker.propTypes = { i: PropTypes.number };
SearchMarker.defaultProps = { i: 1 };
