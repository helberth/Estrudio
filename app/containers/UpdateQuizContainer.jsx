import React from 'react';
import { connect } from 'react-redux';
import { reset, formValueSelector } from 'redux-form';
import { browserHistory } from 'react-router'

import actions from '../actions';
const { updateQuiz, deleteQuiz, LoadOptions } = actions.quizActions;
import { getVisibleQuestionTypes, getQuestionTypeByID } from '../reducers/questiontype-reducer';
import CreateQuizForm from '../forms/CreateQuiz-form';

const formName = 'CreateQuizForm';
let _quizID = '';

const validateAndAddQuiz = (values, dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch(updateQuiz(_quizID, values.title)).then(() => {
      dispatch(reset(formName));
      resolve();//this is for redux-form itself
      //update the page
      browserHistory.push('/');
      browserHistory.push('/quiz/' + _quizID);
    }).catch(error => {
      console.log("error creating and update quiz into container..");
      console.log(error);
      reject({ name: error.message, _error: error.message }); //this is for redux-form itself
    });
  });

};

const validateAndDeleteQuiz = (values, dispatch) => {
  console.log("validateAndDeleteQuiz .. quizID:");
  console.log(values);

  return new Promise((resolve, reject) => {
    //question, questiontypeID, options
    console.log("_quizID: " + _quizID);

    dispatch(deleteQuiz(_quizID)).then(() => {
      dispatch(reset(formName));
      resolve();//this is for redux-form itself

      //close the form
      browserHistory.push('/profile');
    }).catch(error => {
      console.log("error deleting question into container..");
      console.log(error);
      reject({ name: error.message, _error: error.message }); //this is for redux-form itself
    });
  });

};

const selector = formValueSelector(formName)

function mapStateToProps(state, ownProps) {
  const { quizID, title } = ownProps;
  _quizID = quizID;
  
  return {
    //title: "Quiz",
    questiontypes: getVisibleQuestionTypes(state),
    questiontypeValue: selector(state, 'questiontype'),
    initialValues: {
      title: title
    },
    getQuestionType: (id) => {
      //console.log("getQuestionType: " + id);
      return getQuestionTypeByID(state, id);
    }
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addItem: validateAndAddQuiz,
    deleteItem: validateAndDeleteQuiz
    //using reducer method
    /*
    onSelectQuestiontype: (values) => {
      dispatch(LoadOptions(values)) }
      */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuizForm)
