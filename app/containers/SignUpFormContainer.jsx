import { connect } from 'react-redux';

import actions from '../actions';
const { signInWithGoogle, signUpUser, updateUser } = actions.authActions;
import SignUpForm from '../forms/SignUp-form';

const formName = 'SignUpForm';

//For any field errors upon submission (i.e. not instant check)
const validateAndSignUpUser = (values, dispatch) => {
  console.log("validateAndSignUpUser ..");
  console.log(values);

  return new Promise((resolve, reject) => {

    dispatch(signUpUser(values)).then(() => {
      console.log("created and updated user successfully into container..");
      resolve();//this is for redux-form itself
    }).catch(error => {
      console.log("error creating and update user into container..");
      console.log(error);
      reject({ email: error.message, _error: error.message }); //this is for redux-form itself
    });

  });

};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUpUser: validateAndSignUpUser,
    signInWithGoogle: () => {
      dispatch(signInWithGoogle())
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    validateFields: state.validateFields,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)




