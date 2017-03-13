import { firebaseDb, firebaseAuth } from '../firebase/firebase';

export default {

  createQuizItem(userID, categoryID, title) {
    //console.log("createQuiz called.. userID: " + userID + ", categoryID: " + categoryID + ", title:" + title);
    const ref = firebaseDb.ref('/quizzes/' + userID);
    const newQuizKey = ref.push().key;
    var quizData = {
      title: title,
      subs: {}
    };

    var updates = {};
    updates['/quizzes/' + userID + '/' + newQuizKey] = quizData;
    updates['/categories/' + userID + '/' + categoryID + '/quizzes/' + newQuizKey] = true;

    return firebaseDb.ref().update(updates);
  },

  updateQuizItem(userID, quizID, newTitle) {
    var updates = {};
    updates['/quizzes/' + userID + '/' + quizID + '/title/'] = newTitle;
    return firebaseDb.ref().update(updates);
  },

  getQuizItems(userID, callbackAdded, callbackChanged, callbackRemoved) {
    var ref = firebaseDb.ref('/quizzes/' + userID);

    var onChildAdded = ref.on("child_added", snapshot => {
      let attrs = snapshot.val();
      const key = snapshot.key;
      attrs.id = key;
      const questions = attrs.questions;

      if (questions) {
        const questionsArray = Object.keys(questions);
        attrs.questions = questionsArray;
      }

      callbackAdded(attrs);
    });

    var onChildChanged = ref.on("child_changed", snapshot => {
      console.log("onChildChanged called...");
      let attrs = snapshot.val();
      const key = snapshot.key;
      attrs.id = key;
      const questions = attrs.questions;

      if (questions) {
        const questionsArray = Object.keys(questions);
        attrs.questions = questionsArray;
      }

      callbackChanged(attrs);
    });

    var onChildRemoved = ref.on("child_removed", snapshot => {
      console.log("onChildRemoved called...");
      const key = snapshot.key;
      callbackRemoved(key);
    });
  },

  //get quizzes frm fb once
  getQuizzesByCat(userID, quizzes, callbackAdded) {
    const quizzesArray = quizzes.toJS();
    var ref = firebaseDb.ref('/quizzes/' + userID);

    for (var quiz in quizzesArray) {
      ref.child(quizzesArray[quiz]).once("value", snapshot => {
        let attrs = snapshot.val();
        const key = snapshot.key;
        if (attrs) {
          attrs.id = key;
          const questions = attrs.questions;

          if (questions) {
            const questionsArray = Object.keys(questions);
            attrs.questions = questionsArray;
          }
        }

        callbackAdded(attrs);
      })
    }
  },

  deleteQuizItem(userID, categoryID, quizID) {
    const ref = firebaseDb.ref('/quizzes/' + userID + "/" + quizID);
    return ref.set(null);
  },

}