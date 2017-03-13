import * as types from '../actions/action-types';
import api from '../api'
const { questiontypeApi } = api;

import { showModal } from '../actions/modal-actions';
import { getQuizByID } from '../reducers/quiz-reducer';

export function createQuestionType(title, options, answers) {
  console.log("createQuestionType called: " + title + ", options: " + options + ", answers: " + answers);
  return (dispatch, getState) => {
    return questiontypeApi.createQuestionType('/questiontypes/', title, options, answers);
  }
}

export const LoadingQuestionTypes = (value) => {
  return {
    type: types.LOADING_QUESTIONTYPE,
    value: value
  }
}

export function getAllQuestionTypes() {
  return (dispatch, getState) => {
    //console.log("getAllQuestionTypes called..");
    dispatch(LoadingQuestionTypes(true));
    questiontypeApi.getQuestionTypes('/questiontypes/', item => {
      //ADDED
      dispatch({ type: types.RECEIVE_QUESTIONTYPE, entity: item });
      dispatch(LoadingQuestionTypes(false));
    }, item => {
      //CHANGED
      dispatch({ type: types.EDIT_QUESTIONTYPE, entity: item });
      dispatch(LoadingQuestionTypes(false));
    },
      key => {
        //REMOVED
        dispatch({ type: types.DELETED_QUESTIONTYPE, id: key });
        dispatch(LoadingQuestionTypes(false));
      })
  }
}




