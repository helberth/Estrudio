import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../actions'
const { logoutUser } = actions.authActions;
import HeaderComponent from '../components/Header-component';

function mapStateToProps(state) {
  return { 
    authenticatedUser: state.auth.get('status') === 'authenticated' ? state.auth.get('user') : null,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
     logout: () => {
         //sessionStorage.removeItem('jwtToken');
         dispatch(logoutUser());
     }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);