import api from '../api'
const { userApi } = api;
import * as types from '../actions/action-types';

export function createUserInDB(user, callback) {
  return (dispatch, getState) => {
    //check if user is created..
    userApi.getUser(user.uid).then(snapshot => {
      var userFromDB = snapshot.val();
      console.log("getUser after userApi..");
      console.log(userFromDB);
      //TODO: save to store the role of the user
      if (userFromDB) {
        console.log("NO CREAR USUARIO");
        callback(userFromDB.role);
      }
      else {
        console.log("USUARIO NO CREADO, CREARLO..");
        userApi.createUserInDB(user).then(() => {
          console.log("usuario creado satisfactoriamente");
          callback('free_user');
        },
          error => {
            console.log("error creando usuario");
            console.log(error);
          }
        );
      }

    }).catch(error => {
      console.log("error getting the user");
      console.log(error);
    });
  }
}

export function getUser(callback) {
  return (dispatch, getState) => {
    return userApi.verifyUser(user);
  }
}

export function verifyUser(user) {
  return (dispatch, getState) => {
    return userApi.verifyUser(user);
  }
}

export function createRoles() {
  const roles = ["admin", "free_user", "paid_user"];

  return (dispatch, getState) => {
    return userApi.createRoles(roles).then(() => {
      console.log("roles creados satisfactoriamente");
    },
      error => {
        console.log("error creando roles");
        console.log(error);
      }
    );
  }
}

