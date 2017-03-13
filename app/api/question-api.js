import { firebaseDb, firebaseAuth } from '../firebase/firebase';

export default {

    getQuestionsByQuiz(userID, questions, callbackAdded) {
        const questionsArray = questions.toJS();
        var ref = firebaseDb.ref('/questions/' + userID);

        for (var question in questionsArray) {
            ref.child(questionsArray[question]).once("value", snapshot => {
                let attrs = snapshot.val();
                const key = snapshot.key;
                if (attrs) {
                    attrs.id = key;
                }
                callbackAdded(attrs);
            })
        }
    },

    getQuestions(userID, callbackAdded, callbackRemoved) {
        var ref = firebaseDb.ref("/questions/" + userID);

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
            callbackAdded(attrs);
        });

        ref.on("child_removed", snapshot => {
            const key = snapshot.key;
            callbackRemoved(key);
        });
    },

    createQuestion(userID, quizID, title, questiontype, options) {
        const ref = firebaseDb.ref('/questions/' + userID);
        const newQuestionKey = ref.push().key;

        //TODO: use model for subcategory
        var questionData = {
            title: title,
            questiontype: questiontype,
            options: options
        };

        var updates = {};
        updates['/questions/' + userID + '/' + newQuestionKey] = questionData;
        updates['/quizzes/' + userID + '/' + quizID + '/questions/' + newQuestionKey] = true;

        return firebaseDb.ref().update(updates);
    },

    updateQuestion(userID, quizID, questionID, title, questiontype, options) {
        const ref = firebaseDb.ref('/questions/' + userID);

        //TODO: use model for subcategory
        var questionData = {
            title: title,
            questiontype: questiontype,
            options: options
        };

        var updates = {};
        updates['/questions/' + userID + '/' + questionID] = questionData;
        updates['/quizzes/' + userID + '/' + quizID + '/questions/' + questionID] = true;

        return firebaseDb.ref().update(updates);
    },

    deleteQuestion(userID, quizID, questionID) {
        console.log("deleteQuestion called.. userID: " + userID + ", quizID: " + quizID + ", questionID:" + questionID);
        var updates = {};
        updates['/questions/' + userID + '/' + questionID] = null;
        updates['/quizzes/' + userID + '/' + quizID + '/questions/' + questionID] = null;

        return firebaseDb.ref().update(updates);
    },

}