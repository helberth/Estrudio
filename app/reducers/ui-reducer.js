import Immutable from 'immutable'
import * as types from '../actions/action-types';

const { Map } = Immutable

const initialState = Map({
  loadingCategories:false,
  loadingSubCategories:false,
  loadingQuizzes:false,
  loadingQuestions:false,
  loadingQuestionTypes:false
})

export function getCategoriesLoading(state) {
  return state.ui.get('loadingCategories');
}

export function getQuizzesLoading(state) {
  return state.ui.get('loadingQuizzes');
}

export function getQuestionsLoading(state) {
  return state.ui.get('loadingQuestions');
}

export function getSubcategoriesLoading(state) {
  return state.ui.get('loadingSubCategories');
}

export function getQuestionTypeLoading(state) {
  return state.ui.get('loadingQuestionTypes');
}


export default function ui(state = initialState, action) {
  switch (action.type) {
    case types.LOADING_CATEGORY:
      return state.set('loadingCategories', action.value);
    case types.LOADING_SUBCATEGORY:
      return state.set('loadingSubCategories', action.value);
    case types.LOADING_QUIZ:
      return state.set('loadingQuizzes', action.value);
    case types.LOADING_QUESTIONTYPE:
      return state.set('loadingQuestionTypes', action.value);
  }
  return state;
}