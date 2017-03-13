import Immutable from 'immutable'
import { List, Record, Map } from 'immutable';
import Quiz from '../models/Quiz-model';
import QuizMap from '../models/Quiz-map';
import * as types from '../actions/action-types';

const initialStateOfQuizzes = new QuizMap();

const mergeEntities = (state, newEntities) => {
  return state.merge(newEntities.map((entity) => new Quiz(entity)))
}

export function getVisibleQuizzes(state) {
  //console.log("getVisibleQuizzes called..");
  //console.log(state);
  return state.quizzes.valueSeq();
}

export function getQuizByID(state, id) {
  return state.quizzes.get(id);
}

export default function quizzes(state = initialStateOfQuizzes, action) {
  switch (action.type) {
    case types.RECEIVE_QUIZ:
    case types.EDIT_QUIZ:
      if (!action.entity) { return state }
      const quiz = new Quiz(Immutable.fromJS(action.entity));
      //console.log("quiz-reducer: RECEIVE_QUIZ");
      //console.log(quiz.toJS());
      if (quiz)
        return state.set(quiz.getID(), quiz);
    case types.RECEIVE_QUESTIONS_BY_QUIZ:
      return state.update(action.id, (quiz) => {
        const questions = new List(Immutable.fromJS(action.entities));
        return quiz.set('questions', questions)
      });
    case types.DELETED_QUIZ:
      return state.remove(action.id);
    case types.CLEAR_QUIZZES:
      return initialStateOfQuizzes;
  }
  return state;
}