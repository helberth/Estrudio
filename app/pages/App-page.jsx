import React from 'react';
import { Component } from 'react';

import AppContainer from '../containers/AppContainer';
import ModalContainer from '../containers/ModalContainer';

export default class App extends Component {
  render() {
    return (
      <AppContainer>
        <ModalContainer />
        {this.props.children}
      </AppContainer>
    );
  }
}