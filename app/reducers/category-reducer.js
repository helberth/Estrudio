import Immutable from 'immutable'
import { List, Record, Map } from 'immutable';
import Category from '../models/Category-model';
import CategoryMap from '../models/Category-map';
import * as types from '../actions/action-types';

const initialStateOfCats = new CategoryMap();

const mergeEntities = (state, newEntities) => {
  return state.merge(newEntities.map((entity) => new Category(entity)))
}

export function getVisibleCategories(state) {
  return state.categories.valueSeq();
}

export function getCategoryTitleByID(state, id) {
  return state.categories.get(id).getLabel();
}

export function getCategoryByID(state, id) {
  return state.categories.get(id);
}

export default function categories(state = initialStateOfCats, action) {
  switch (action.type) {
    case types.RECEIVE_CATEGORY:
    case types.EDIT_CATEGORY:
      if (!action.entity) { return state }
      const category = new Category(Immutable.fromJS(action.entity));
      console.log("category-reducer: RECEIVE_CATEGORY");
      console.log(category.toJS());
      if (category)
        return state.set(category.getID(), category);
    case types.RECEIVE_QUIZ_BY_CAT:
      console.log("category-reducer: RECEIVE_QUIZ_BY_CAT");
      console.log(action.id);
      console.log(action.quizID);
      return state.update(action.id, (category) => {
        console.log("Category:");
        console.log(category.toJS());
        const quizzes = new List(Immutable.fromJS(action.entities));
      });
    case types.RECEIVE_SUBCATEGORIES_BY_CAT:
      return state.update(action.id, (category) => {
        const subs = new List(Immutable.fromJS(action.entities));
        return category.set('subcategories', subs)
      });
    case types.DELETED_CATEGORY:
      return state.remove(action.id);
  }
  return state;
}