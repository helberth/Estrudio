import Immutable from 'immutable'
import { List, Record, Map } from 'immutable';
import Subcategory from '../models/Subcategory-model';
import SubcategoryMap from '../models/Subcategory-map';
import * as types from '../actions/action-types';

const initialStateOfSubcats = new SubcategoryMap();

const mergeSubcategories = (state, newSubcategories) =>
  state.merge(newSubcategories.map((sub) => new Subcategory(sub)));

export function getSubcategoryTitleByID(state, id) {
  return state.subcategories.get(id).get('title');
}

export function getSubcategoryByID(state, id) {
  return state.subcategories.get(id);
}

export default function subcategories(state = initialStateOfSubcats, action) {
  switch (action.type) {
    case types.RECEIVE_SUBCATEGORY:
      //console.log("RECEIVE_SUBCATEGORY");
      //console.log(action.entity);
      if (!action.entity) { return state }
      const subcategory = new Subcategory(Immutable.fromJS(action.entity));
      if (subcategory)
        return state.set(subcategory.get('id'), subcategory);
    //return mergeSubcategories(state, Immutable.fromJS(action.entities));
    case types.DELETED_SUBCATEGORY:
      return state.remove(action.id);
  }

  return state;
}