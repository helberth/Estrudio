import * as types from '../actions/action-types';
import api from '../api'
const { quizApi } = api;

import { showModal } from '../actions/modal-actions';
import { getQuizByID } from '../reducers/quiz-reducer';
import { getCategoryByID } from '../reducers/category-reducer';

export function createQuiz(categoryID, title) {
  return (dispatch, getState) => {
    const userID = getState().auth.get('user').getUID();
    return quizApi.createQuizItem(userID, categoryID, title);
  }
}

export function updateQuiz(quizID, title) {
  console.log("updateQuiz called..");
  console.log(quizID);

  return (dispatch, getState) => {
    const userID = getState().auth.get('user').getUID();
    return quizApi.updateQuizItem(userID, quizID, title);
  }
}

export const LoadingQuizzes = (value) => {
  return {
    type: types.LOADING_QUIZ,
    value: value
  }
}

export const LoadOptions = (value) => {
  return {
    type: types.LOAD_OPTIONS,
    value: value
  }
}

//get all quizzes
export function getAllQuizzes(categoryID) {
  console.log("getAllQuizzes..");
  return (dispatch, getState) => {
    dispatch(LoadingQuizzes(true));
    const user = getState().auth.get('user');
    if (user) {
      const userID = user.getUID();

      quizApi.getQuizItems(userID, categoryID, item => {
        //ADDED
        dispatch({ type: types.RECEIVE_QUIZ, entity: item });
        dispatch(LoadingQuizzes(false));
      }, item => {
        //CHANGED
        dispatch({ type: types.EDIT_QUIZ, entity: item });
        dispatch(LoadingQuizzes(false));
      },
        key => {
          //REMOVED
          dispatch({ type: types.DELETED_QUIZ, id: key });
          dispatch(LoadingQuizzes(false));
        })

    }
  }
}

//get the ids from categories
export function getQuizzesByCat(categoryID) {
  return (dispatch, getState) => {
    const user = getState().auth.get('user');
    if (user) {
      const userID = user.getUID();
      const category = getCategoryByID(getState(), categoryID);
      if (category) {
        const quizzesArray = category.getQuizzes();

        quizApi.getQuizzesByCat(userID, quizzesArray, item => {
          dispatch({ type: types.RECEIVE_QUIZ, entity: item });
        })

      }
    }
  }
}

export function deleteQuiz(categoryID, quizID) {
  console.log("deleteQuiz called..");
  console.log(quizID);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const userID = getState().auth.get('user').getUID();
      const quiz = getQuizByID(getState(), quizID);

      if (quiz) {
        const questions = quiz.getQuestions().toJS();
        if (questions.length > 0) {
          dispatch(showModal('Quiz has questions', 'Delete first all questions'));
          reject("quiz has questions");
        }
        else
          quizApi.deleteQuizItem(userID, categoryID, quizID).then(() => {
            resolve();
          }).catch(error => {
            reject(error);
          });
      }
      else
        reject("quiz doesn't exist");
    });
    //return quizApi.deleteCategory(userID, quizID);
  }
}

export function clearQuizzes() {
  //dispatch({ type: types.CLEAR_QUIZZES });
  return {
    type: types.CLEAR_QUIZZES
  }
}


