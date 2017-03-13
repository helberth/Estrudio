import { firebaseDb, firebaseAuth } from '../firebase/firebase';

export default {

  getUser(userId, callback) {
    return firebaseDb.ref('/users/' + userId).once('value');
  },

  createUserInDB(user) {
    user.role = 'free_user';
    const userID = user.uid;
    var updates = {};
    updates['/users/' + userID] = user;
    return firebaseDb.ref().update(updates);
  },

  createRoles(roles) {
    var updates = {};
    roles.map((role) => {
      updates['/roles/' + role] = true;
    });
    return firebaseDb.ref().update(updates);
  },

}