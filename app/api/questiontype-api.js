import { firebaseDb, firebaseAuth } from '../firebase/firebase';

export default {

  getQuestionTypes(path, callbackAdded, callbackChanged, callbackRemoved) {
    var ref = firebaseDb.ref(path);

    ref.on("child_added", snapshot => {
      let attrs = snapshot.val();
      const key = snapshot.key;
      attrs.id = key;
      callbackAdded(attrs);
    });

    ref.on("child_changed", snapshot => {
      let attrs = snapshot.val();
      const key = snapshot.key;
      attrs.id = key;
      callbackChanged(attrs);
    });

    ref.on("child_removed", snapshot => {
      const key = snapshot.key;
      callbackRemoved(key);
    });
  },

  createQuestionType(path, title, options, answers) {
    const ref = firebaseDb.ref(path);
    const newQuestionRef = ref.push();
    return newQuestionRef.set({
      title: title,
      options: options,
      answers: answers
    });
  },

}