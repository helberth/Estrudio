import * as types from '../actions/action-types';
import api from '../api'
const { questionApi } = api;

import { showModal } from '../actions/modal-actions';
import { getQuestionByID } from '../reducers/question-reducer';
import { getQuestionTypeByID } from '../reducers/questiontype-reducer';
import { getQuizByID } from '../reducers/quiz-reducer';

export function createAndUpdateQuestion(quizID, questionID, title, questiontype, options) {
    console.log("createQuestion called. title: " + title + ", questiontype: " + questiontype);
    console.log("options:");
    console.log(options);
    return (dispatch, getState) => {
        const userID = getState().auth.get('user').getUID();
        if (questionID)
            return questionApi.updateQuestion(userID, quizID, questionID, title, questiontype, options);
        else
            return questionApi.createQuestion(userID, quizID, title, questiontype, options);
    }
}

export const LoadingQuestions = (value) => {
    return {
        type: types.LOADING_QUESTION,
        value: value
    }
}

export const LoadOptions = (value) => {
    return {
        type: types.LOAD_OPTIONS,
        value: value
    }
}

export function getQuestionsByQuiz(quizID) {
    return (dispatch, getState) => {
        dispatch(LoadingQuestions(true));
        const user = getState().auth.get('user');
        if (user) {
            const userID = user.getUID();
            const quiz = getQuizByID(getState(), quizID);
            if (quiz) {
                const questionsArray = quiz.getQuestions();
                questionApi.getQuestionsByQuiz(userID, questionsArray, item => {
                    dispatch({ type: types.RECEIVE_QUESTION, entity: item });
                })
            }
        }
    }
}

export function getAllQuestions() {
    return (dispatch, getState) => {
        const user = getState().auth.get('user');
        if (user) {
            const userID = user.getUID();
            questionApi.getQuestions(userID, item => {
                //ADDED
                dispatch({ type: types.RECEIVE_QUESTION, entity: item });
            }, key => {
                //REMOVED
                dispatch({ type: types.DELETED_QUESTION, id: key });
            })
        }
    }
}

export function clearQuestions() {
    return {
        type: types.CLEAR_QUESTIONS
    }
}

export function deleteQuestion(quizID, questionID) {
    console.log("deleteQuestion called..");
    console.log("quizID: ");
    console.log(quizID);
    console.log("questionID: ");
    console.log(questionID);
    return (dispatch, getState) => {
        const userID = getState().auth.get('user').getUID();
        return questionApi.deleteQuestion(userID, quizID, questionID);
    }
}