import React from 'react';
import { connect } from 'react-redux';
import { reset, formValueSelector } from 'redux-form';
import { browserHistory } from 'react-router';

import actions from '../actions';
const { createQuiz, LoadOptions } = actions.quizActions;
import { getVisibleQuestionTypes, getQuestionTypeByID } from '../reducers/questiontype-reducer';
import CreateQuizForm from '../forms/CreateQuiz-form';

const formName = 'CreateQuizForm';
let _categoryID = '';

const validateAndAddQuiz = (values, dispatch) => {
  return new Promise((resolve, reject) => {

    dispatch(createQuiz(_categoryID, values.title)).then(() => {
      console.log("created and updated quiz successfully into container..");
      dispatch(reset(formName));
      resolve();//this is for redux-form itself
      
      //go to the quiz list      
      //browserHistory.push('/profile');
      browserHistory.push('/category/' + _categoryID);

      //or to the quiz page
    }).catch(error => {
      console.log("error creating and update quiz into container..");
      console.log(error);
      reject({ title: error.message, _error: error.message }); //this is for redux-form itself
    });
  });

};

const selector = formValueSelector(formName)

function mapStateToProps(state, ownProps) {

  const { title, categoryID } = ownProps;
  _categoryID = categoryID;

  return {
    //title: "Quiz",
    questiontypes: getVisibleQuestionTypes(state),
    questiontypeValue: selector(state, 'questiontype'),
    initialValues: {
      answers: 1,
      options: 2,
      members: state.formquiz.get('answers'),
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
    //using reducer method
    /*
    onSelectQuestiontype: (values) => {
      dispatch(LoadOptions(values)) }
      */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuizForm)
