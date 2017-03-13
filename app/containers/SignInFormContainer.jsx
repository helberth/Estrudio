import { connect } from 'react-redux';

import actions from '../actions';
const { signInWithGoogle, signInUser } = actions.authActions;
import SignInForm from '../forms/SignIn-form';

const formName = 'SignInForm';


//For any field errors upon submission (i.e. not instant check)
const validateAndSignInUser = (values, dispatch) => {
  console.log("validateAndSignInUser ..");
  console.log(values);

  return new Promise((resolve, reject) => {

    dispatch(signInUser(values)).then(() => {
      console.log("user signin successfully into SignInFormContainer..");
      resolve();//this is for redux-form itself
    }).catch(error => {
      console.log("error creating user into SignInFormContainer..");
      console.log(error);
      reject({ email: error.message, _error: error.message }); //this is for redux-form itself
    });

  });

};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: validateAndSignInUser,
    signInWithGoogle: () => {
      dispatch(signInWithGoogle())
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    //validateFields: state.validateFields,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)






