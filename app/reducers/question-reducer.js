import Immutable from 'immutable'
import { List, Record, Map } from 'immutable';
import Question from '../models/Question-model';
import QuestionMap from '../models/Question-map';
import * as types from '../actions/action-types';

const initialStateOfQuestions = new QuestionMap();

const mergeEntities = (state, newEntities) => {
  return state.merge(newEntities.map((entity) => new Question(entity)))
}

export function getQuestionByID(state, id) {
  return state.questions.get(id);
}

export default function questions(state = initialStateOfQuestions, action) {
  switch (action.type) {
    case types.RECEIVE_QUESTION:
    case types.EDIT_QUESTION:
      if (!action.entity) { return state }
      const question = new Question(Immutable.fromJS(action.entity));
      if (question)
        return state.set(question.getID(), question);
    case types.DELETED_QUESTION:
      return state.remove(action.id);
    case types.CLEAR_QUESTIONS:
      return initialStateOfQuestions;
  }
  return state;
}