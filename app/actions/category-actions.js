import * as types from '../actions/action-types';
import api from '../api'
const { categoryApi } = api;

import { showModal } from '../actions/modal-actions';
import { getCategoryByID } from '../reducers/category-reducer';

export function createCategory(title) {
  return (dispatch, getState) => {
    const userID = getState().auth.get('user').getUID();
    return categoryApi.createCategory(userID, title);
  }
}

export const LoadingCategories = (value) => {
  return {
    type: types.LOADING_CATEGORY,
    value: value
  }
}

export function getAllCategories() {
  return (dispatch, getState) => {
    dispatch(LoadingCategories(true));
    const user = getState().auth.get('user');
    if (user) {
      const userID = user.getUID();
      categoryApi.getCategories(userID, item => {
        //ADDED
        dispatch({ type: types.RECEIVE_CATEGORY, entity: item });
        dispatch(LoadingCategories(false));
      }, item => {
        //CHANGED
        dispatch({ type: types.EDIT_CATEGORY, entity: item });
        dispatch(LoadingCategories(false));
      },
        key => {
          //REMOVED
          dispatch({ type: types.DELETED_CATEGORY, id: key });
          dispatch(LoadingCategories(false));
        })
    }
  }
}

export function getAllSubcategories() {
  return (dispatch, getState) => {
    const user = getState().auth.get('user');
    if (user) {
      const userID = user.getUID();
      categoryApi.getSubcategories(userID, item => {
        //ADDED
        dispatch({ type: types.RECEIVE_SUBCATEGORY, entity: item });
      }, key => {
        //REMOVED
        dispatch({ type: types.DELETED_SUBCATEGORY, id: key });
      })
    }
  }
}

export function deleteCategory(categoryID) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const userID = getState().auth.get('user').getUID();
      const category = getCategoryByID(getState(), categoryID);

      if (category) {
        const quizzes = category.getQuizzes().toJS();
        if (quizzes.length > 0) {
          dispatch(showModal('Category has quizzes', 'Delete all quizzes first'));
          reject("category has quizzes");
        }
        else
          categoryApi.deleteCategory(userID, categoryID).then(() => {
            resolve();
          }).catch(error => {
            reject(error);
          });
      }
      else
        reject("category doesn't exist");
    });
  }
}