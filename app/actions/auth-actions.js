import api from '../api'
const { authApi, userApi } = api;
import { browserHistory } from 'react-router'
import * as types from '../actions/action-types';

export function listenToAuth(callback) {
  return (dispatch, getState) => {
    authApi.onAuthStateChanged((authData) => {
      if (authData) {
        dispatch({ type: types.SIGNUP_USER_SUCCESS, payload: authData })
        callback();
      } else {
        dispatch({ type: types.LOGOUT_USER });
      }
    });
  };
};

export function logoutUser() {
  return (dispatch) => {
    authApi.signOut().then(() => {
      //ir a home
      browserHistory.push('/');
    },
      (error) => {
        console.log("An error happened");
      });
  };
};

export function signInUser(user) {
  return (dispatch, getState) => {
    dispatch({ type: types.SIGNIN_USER, payload: null })
    return authApi.singInUser(user).then(
      response => {
        console.log("then into users.js ...");
        console.log(response);
        dispatch({ type: types.SIGNIN_USER_SUCCESS, payload: response })
      },
      error => {
        console.log("catch into user.js...");
        console.log(error);
        dispatch({ type: types.SIGNIN_USER_FAILURE, payload: error })
        throw error;
      }
    );
  }
}

export function signUpUser(user) {
  console.log("signUpUser called..");
  console.log(user);

  return (dispatch, getState) => {
    dispatch({ type: types.SIGNUP_USER, payload: null })
    return authApi.createUserWithEmailAndPassword(user).then(
      response => {
        console.log("then into signUpUser::users.js ...");
        console.log(response);
        console.log("displayName: " + user.name);
        return authApi.updateProfile(user);

      },
      error => {
        console.log("catch into signUpUser::user.js...");
        console.log(error);
        dispatch({ type: types.SIGNUP_USER_FAILURE, payload: error })
        throw error;
      }
    );
  }
}

export function updateUser(user) {
  console.log("updateUser called..");
  console.log(user);

  return (dispatch, getState) => {
    return authApi.updateProfile({ name: 'hel1_for_now' }).then(
      response => {
        console.log("then into updateUser::users.js ...");
        console.log(response);
      },
      error => {
        console.log("catch into updateUser::user.js...");
        console.log(error);
        throw error;
      }
    );
  }
}

function authenticate(provider) {
  return dispatch => {
    authApi.authenticate(provider);
  };
}

export function signInWithGithub() {
  return authenticate('github');
}

export function signInWithGoogle() {
  return authenticate('google');
}

export function signInWithTwitter() {
  return authenticate('twitter');
}

