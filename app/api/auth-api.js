import firebase from 'firebase';
import { firebaseDb, firebaseAuth } from '../firebase/firebase';

export default {

  createUserWithEmailAndPassword(user) {
    return firebaseAuth.createUserWithEmailAndPassword(user.email, user.password);
  },

  singInUser(user) {
    return firebaseAuth.signInWithEmailAndPassword(user.email, user.password);
  },

  authenticate(provider) {
    let firebaseProvider;
    switch (provider) {
      case 'google':
      default:
        firebaseProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'github':
        firebaseProvider = new firebase.auth.GithubAuthProvider();
        break;
      case 'twitter':
        firebaseProvider = new firebase.auth.TwitterAuthProvider();
        break;
    }
    return firebaseAuth.signInWithPopup(firebaseProvider);
  },

  onAuthStateChanged(user) {
    return firebaseAuth.onAuthStateChanged(user);
  },

  updateProfile(user) {
    console.log("updateProfile called");
    console.log(user);
    const currentUser = firebase.auth().currentUser;

    return currentUser.updateProfile({
      displayName: user.name,
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
    });/*.then(function () {
      // Update successful.
    }, function (error) {
      // An error happened.
    });*/
  },

  signOut() {
    return firebaseAuth.signOut();
  }

}