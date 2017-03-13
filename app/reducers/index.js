import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth-reducer';
import categoryReducer from './category-reducer';
import quizReducer from './quiz-reducer';
import questionReducer from './question-reducer';
import questiontypeReducer from './questiontype-reducer';
import subcategoryReducer from './subcategory-reducer';
import modalReducer from './modal-reducer';
import uiReducer from './ui-reducer';
import formquizReducer from './formquiz-reducer';

export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  categories: categoryReducer,
  quizzes: quizReducer,
  questions: questionReducer,
  questiontypes: questiontypeReducer,
  subcategories: subcategoryReducer,
  modal: modalReducer,
  ui: uiReducer,
  form: formReducer,
  formquiz: formquizReducer
})


