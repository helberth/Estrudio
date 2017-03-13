import React, { Component } from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import SignUpFormContainer from '../containers/SignUpFormContainer';

class SignIn extends Component {
  render() {
    return <div>
        <HeaderContainer/>
        <SignUpFormContainer/>
      </div>
  }
}


export default SignIn;