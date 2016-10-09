import React, { Component } from 'react';
import { AppBar, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import counter from '../stores/points.js';
import '../style/style.scss';

export default class Application extends Component {
  constructor () {
    super();
    this.state = { count: counter.getState() };
  }

  onFabClick () {
    counter.dispatch({ type: 'INCREMENT' });
  }

  render () {
    const self = this;
    counter.subscribe(() => self.setState({ count: counter.getState() }));
    return (
      <div>
        <AppBar
          title="lmao"
          style={{ position: 'fixed' }}
        />
        <div className="container">
          <h1>Ayyy lmao</h1>
          <h2>Replace this element in src/components/app.jsx with your actual content!</h2>
          <h2>Counter: {this.state.count}</h2>
        </div>
        <FloatingActionButton className="fab" onClick={this.onFabClick}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}
