import { firebaseDb, firebaseAuth } from '../firebase/firebase';

export default {

  getCategories(userID, callbackAdded, callbackChanged, callbackRemoved) {
    var ref = firebaseDb.ref("/categories/" + userID);

    ref.on("child_added", snapshot => {
      let attrs = snapshot.val();
      const key = snapshot.key;
      attrs.id = key;
      const quizzes = attrs.quizzes;

      if (quizzes) {
        const quizzesArray = Object.keys(quizzes);
        attrs.quizzes = quizzesArray;
      }
      callbackAdded(attrs);
    });

    ref.on("child_changed", snapshot => {
      let attrs = snapshot.val();
      const key = snapshot.key;
      attrs.id = key;
      const quizzes = attrs.quizzes;

      if (quizzes) {
        const quizzesArray = Object.keys(quizzes);
        attrs.quizzes = quizzesArray;
      }

      callbackChanged(attrs);
    });

    ref.on("child_removed", snapshot => {
      const key = snapshot.key;
      callbackRemoved(key);
    });
  },

  createCategory(userID, title) {
    const ref = firebaseDb.ref("/categories/" + userID);
    const newCategoryRef = ref.push();
    return newCategoryRef.set({
      title: title,
      subs: {}
    });
  },

  deleteCategory(userID, categoryID) {
    const ref = firebaseDb.ref("/categories/" + userID + "/" + categoryID);
    //TODO: remove subs 
    return ref.set(null);
  },
}