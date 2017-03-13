import React from 'react';
import { connect } from 'react-redux';
import { reset, formValueSelector } from 'redux-form';
import { browserHistory } from 'react-router';

import actions from '../actions';
const { createAndUpdateQuestion, deleteQuestion, LoadOptions, getQuestionsByQuiz } = actions.questionActions;
import { getVisibleQuestionTypes, getQuestionTypeByID } from '../reducers/questiontype-reducer';
import { getQuestionByID } from '../reducers/question-reducer';
import CreateQuestionForm from '../forms/CreateQuestion-form';

import Immutable from 'immutable'
import Question from '../models/Question-model';

const formName = 'CreateQuestionForm';
let _quizID = '';
let _questionID = '';
let _close = undefined;

const validateAndAddQuestion = (values, dispatch) => {
  console.log("validateAndAddQuestion ..");
  console.log(values);
  console.log(JSON.stringify(values, null, 2));
  let question = new Question();
  let newOptions = [];
  let newOptionsArray = []
  let answers = [];

  values.options.forEach((option, index) => {
    console.log(index);
    console.log(option.title);
    newOptions.push(option.title);
    newOptionsArray[index] = option.title;
    if (option.correct) answers.push(index);
  })

  return new Promise((resolve, reject) => {
    //question, questiontypeID, options
    dispatch(createAndUpdateQuestion(_quizID, values.id, values.title, values.questiontype, values.options)).then(() => {
      console.log("created and updated question successfully into container..");
      dispatch(getQuestionsByQuiz(_quizID)); //in case of added or removed a question
      //close the form
      if (_close) {
        _close();
      }

    }).catch(error => {
      console.log("error creating and update question into container..");
      console.log(error);
      reject({ name: error.message, _error: error.message }); //this is for redux-form itself
    });
  });

};

const validateAndDeleteQuestion = (values, dispatch) => {
  console.log("deleteQuestion .. questionID:");
  console.log(values);

  return new Promise((resolve, reject) => {
    //question, questiontypeID, options
    dispatch(deleteQuestion(_quizID, values.id)).then(() => {
      console.log("deleted question successfully into container..");
      dispatch(reset(formName));
      resolve();//this is for redux-form itself
      if (_close) {
        _close();
      }
    }).catch(error => {
      console.log("error deleting question into container..");
      console.log(error);
      reject({ name: error.message, _error: error.message }); //this is for redux-form itself
    });
  });

};

const selector = formValueSelector(formName)

function mapStateToProps(state, ownProps) {
  const { questionID } = ownProps;
  let valuesFromServer = {};
  let currentQuestion = undefined;

  if (questionID) {
    const questionByID = getQuestionByID(state, questionID);
    if (questionByID) {
      currentQuestion = questionByID.toJS();
    }
    valuesFromServer = {
      title: "pre1",
      options: [
        { title: 'rta1', correct: true, order: 1 },
        { title: 'rta2', correct: false, order: 2 },
        { title: 'rta3', correct: true, order: 3 },
        { title: 'rta4', correct: false, order: 4 },
      ]
    }
  }

  return {
    title: "Question",
    questiontypes: getVisibleQuestionTypes(state),
    initialValues: currentQuestion,//valuesFromServer,
    getQuestionType: (id) => {
      return getQuestionTypeByID(state, id);
    }

  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { quizID, questionID, close } = ownProps;
  _quizID = quizID;
  _questionID = questionID;
  _close = close;
  return {
    addItem: validateAndAddQuestion,
    deleteItem: validateAndDeleteQuestion
    //using reducer method
    /*
    onSelectQuestiontype: (values) => {
      dispatch(LoadOptions(values)) }
      */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestionForm)
