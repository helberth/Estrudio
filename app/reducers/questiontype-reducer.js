import Immutable from 'immutable'
import { List, Record, Map } from 'immutable';
import QuestionType from '../models/Questiontype-model';
import QuestionTypeMap from '../models/Questiontype-map';
import * as types from '../actions/action-types';

const initialStateOfQuestionTypes = new QuestionTypeMap();

export function getVisibleQuestionTypes(state) {
  return state.questiontypes.valueSeq();
}

export function getQuestionTypeByID(state, id) {
  return state.questiontypes.get(id);
}

export function getQuestiontypeTitleByID(state, id) {
  return state.questiontypes.get(id).getLabel();
}

export default function questiontypes(state = initialStateOfQuestionTypes, action) {
  switch (action.type) {
    case types.RECEIVE_QUESTIONTYPE:
      if (!action.entity) { return state }
      const questiontype = new QuestionType(Immutable.fromJS(action.entity));
      if (questiontype)
        return state.set(questiontype.getID(), questiontype);
  }
  return state;
}