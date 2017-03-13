import React, { Component } from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import SignInFormContainer from '../containers/SignInFormContainer';

class SignIn extends Component {
  render() {
    return <div>
        <HeaderContainer/>
        <SignInFormContainer/>
      </div>
  }
}


export default SignIn;